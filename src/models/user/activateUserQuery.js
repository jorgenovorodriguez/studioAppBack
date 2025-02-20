import { pool } from '../../db.js';

const getUserByRegistrationCode = async (registrationCode) => {
    const [userRows] = await pool.query(
        'SELECT id, isActive FROM users WHERE regCode = ?',
        [registrationCode]
    );
    return userRows;
};

const activateUserByRegistrationCode = async (registrationCode) => {
    await pool.query('UPDATE users SET isActive = ? WHERE regCode = ?', [
        true,
        registrationCode,
    ]);
};

export { getUserByRegistrationCode, activateUserByRegistrationCode };
