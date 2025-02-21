import { pool } from '../../db.js';

export const recoverPassCodeMail = async (email, recoverPassCode, expireAt) => {
    try {
        await pool.query(
            'UPDATE users SET recoverPassCode = ?, recoverPassCodeExpiration = ? WHERE email = ?',
            [recoverPassCode, expireAt, email]
        );
    } catch (err) {
        console.error('Error al actualizar el código de recuperación:', err);
        throw new errorMsg(
            'Error al actualizar el código de recuperación',
            500
        );
    }
};

export const getUserByEmailAndCode = async (email, recoverPassCode) => {
    try {
        const [user] = await pool.query(
            `SELECT id FROM users WHERE email = ? AND recoverPassCode = ? AND recoverPassCodeExpiration > NOW()`,
            [email, recoverPassCode]
        );

        return user.length > 0 ? user[0] : null;
    } catch (err) {
        console.error(
            'Error al obtener usuario por email y código de recuperación:',
            err
        );
        throw new errorMsg('Error al obtener el usuario', 500);
    }
};

export const updateUserPassword = async (email, hashedPassword) => {
    try {
        await pool.query(
            `UPDATE users 
             SET password = ?, recoverPassCode = NULL, recoverPassCodeExpiration = NULL 
             WHERE email = ?`,
            [hashedPassword, email]
        );
    } catch (err) {
        console.error('Error al actualizar la contraseña del usuario:', err);
        throw new errorMsg('Error al actualizar la contraseña', 500);
    }
};
