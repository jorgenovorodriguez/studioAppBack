import {
    getUserByRegistrationCode,
    activateUserByRegistrationCode,
} from '../../models/user/activateUserQuery.js';

const activateUser = async (req, res) => {
    const { registrationCode } = req.params;

    if (!registrationCode) {
        return res
            .status(400)
            .json({ error: 'El código de activación es necesario' });
    }

    try {
        const userRows = await getUserByRegistrationCode(registrationCode);

        if (userRows.length === 0) {
            return res
                .status(404)
                .json({ error: 'Código de activación no válido o expirado' });
        }

        const user = userRows[0];

        if (user.isActive) {
            return res
                .status(400)
                .json({ error: 'La cuenta ya está activada' });
        }

        await activateUserByRegistrationCode(registrationCode);

        res.status(200).json({ message: 'Cuenta activada con éxito' });
    } catch (error) {
        console.error('Error al activar el usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export default activateUser;
