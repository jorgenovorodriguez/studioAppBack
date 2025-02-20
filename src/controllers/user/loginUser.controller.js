import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import loginUserQuery from '../../models/user/loginUserQuery.js';

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: 'Email y contraseña son obligatorios' });
    }

    try {
        const user = await loginUserQuery(email);

        if (user.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user[0].password
        );

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: user[0].id, role: user[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ message: 'Sesión iniciada', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export default loginUser;
