import { pool } from '../../db.js';
import { errorMsg } from '../../services/manageError.js';

export const getUserByRegistrationCode = async (registrationCode) => {
    try {
        const [userRows] = await pool.query(
            'SELECT id, isActive FROM users WHERE regCode = ?',
            [registrationCode]
        );

        if (userRows.length === 0) {
            throw new errorMsg('Código de activación no válido o expirado');
        }

        return userRows;
    } catch (err) {
        console.error(
            'Error al obtener el usuario por código de registro',
            err
        );
        throw new errorMsg(
            'Error al obtener el usuario por código de registro',
            500
        );
    }
};

export const activateUserByRegistrationCode = async (registrationCode) => {
    try {
        await pool.query('UPDATE users SET isActive = ? WHERE regCode = ?', [
            true,
            registrationCode,
        ]);
    } catch (err) {
        console.error('Error al activar el usuario', err);
        throw new errorMsg('Error al activar el usuario', 500);
    }
};
