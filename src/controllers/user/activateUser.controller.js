import {
    getUserByRegistrationCode,
    activateUserByRegistrationCode,
} from '../../models/user/activateUserQuery.js';
import { errorMsg } from '../../services/manageError.js';

const activateUser = async (req, res, next) => {
    const { registrationCode } = req.params;

    if (!registrationCode) {
        return errorMsg('El código de activación es necesario', 400);
    }

    try {
        const userRows = await getUserByRegistrationCode(registrationCode);

        if (userRows.length === 0) {
            return errorMsg('Código de activación no válido o expirado', 404);
        }

        const user = userRows[0];

        if (user.isActive) {
            return errorMsg('La cuenta ya está activada', 400);
        }

        await activateUserByRegistrationCode(registrationCode);

        res.status(200).json({ message: 'Cuenta activada con éxito' });
    } catch (error) {
        next(error);
    }
};

export default activateUser;
