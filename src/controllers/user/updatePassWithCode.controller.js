import bcrypt from 'bcryptjs';
import {
    getUserByEmailAndCode,
    updateUserPassword,
} from '../../models/user/recoverPassUserQuery.js';
import { errorMsg } from '../../services/manageError.js';

const updatePassWithCode = async (req, res, next) => {
    try {
        const { email, recoverPassCode, newPass } = req.body;

        if (!email || !recoverPassCode || !newPass) {
            errorMsg('Faltan campos por rellenar', 400);
        }

        const user = await getUserByEmailAndCode(email, recoverPassCode);

        if (!user) {
            errorMsg('Código de recuperación erróneo o expirado', 400);
        }

        const hashedPassword = await bcrypt.hash(newPass, 10);

        await updateUserPassword(email, hashedPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default updatePassWithCode;
