import {
    checkIfUserExists,
    createUser,
    generateActivationCode,
} from '../../models/user/registerUserQuery.js';
import sendCode from '../../services/sendCode.js';
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const existingUser = await checkIfUserExists(email);

        if (existingUser.length > 0) {
            return res
                .status(409)
                .json({ error: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const activationCode = generateActivationCode();

        const result = await createUser(
            name,
            email,
            hashedPassword,
            activationCode
        );

        const activationURL = `http://localhost:3000/api/activate/${activationCode}`;

        const emailSubject = 'Activación de tu cuenta';
        const emailBody = `
          ¡Hola usuario!
          Puedes activar tu cuenta haciendo clic en el siguiente enlace:
          ${activationURL}
`;

        await sendCode(email, emailSubject, emailBody);

        res.status(201).json({
            message:
                'Usuario registrado con éxito. Revisa tu correo para activarlo.',
        });
    } catch (error) {
        console.error('Error en registerUser:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export default registerUser;
