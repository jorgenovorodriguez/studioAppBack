import {
    createUser,
    generateActivationCode,
} from '../../models/user/registerUserQuery.js';
import checkIfUserExists from '../../models/user/checkUserQuery.js';
import sendCode from '../../services/sendMail.js';
import bcrypt from 'bcryptjs';
import { errorMsg } from '../../services/manageError.js';

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            errorMsg('Todos los campos son obligatorios', 400);
        }

        const existingUser = await checkIfUserExists(email);
        if (existingUser.length > 0) {
            errorMsg('El email ya está registrado', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const activationCode = generateActivationCode();
        await createUser(name, email, hashedPassword, activationCode);

        const activationURL = `http://localhost:3000/api/activate/${activationCode}`;
        const emailSubject = 'Activación de tu cuenta';
        const emailBody = `¡Hola usuario!\nPuedes activar tu cuenta aquí: ${activationURL}`;

        await sendCode(email, emailSubject, emailBody);

        res.status(201).json({
            message:
                'Usuario registrado con éxito. Revisa tu correo para activarlo.',
        });
    } catch (err) {
        next(err);
    }
};

export default registerUser;
