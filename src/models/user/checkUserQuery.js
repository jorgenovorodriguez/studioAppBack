import { pool } from '../../db.js';

const checkIfUserExists = async (email) => {
    try {
        const [rows] = await pool.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );
        return rows;
    } catch (err) {
        console.error('Error al verificar si el usuario existe:', err);
        throw new errorMsg('Error al verificar si el usuario existe', 500);
    }
};

export default checkIfUserExists;
