import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import loginUserQuery from '../../models/user/loginUserQuery.js';
import { errorMsg } from '../../services/manageError.js';

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return errorMsg('Email y contraseña obligatorios', 400);
    }

    try {
        const user = await loginUserQuery(email);

        if (user.length === 0) {
            return errorMsg('Credenciales incorrectas', 401);
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user[0].password
        );

        if (!isValidPassword) {
            return errorMsg('Credenciales incorrectas', 401);
        }

        const token = jwt.sign(
            { id: user[0].id, role: user[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ message: 'Sesión iniciada', token });
    } catch (error) {
        next(error);
    }
};

export default loginUser;
