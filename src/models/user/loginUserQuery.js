import { pool } from '../../db.js';
import { errorMsg } from '../../services/manageError.js';

const loginUserQuery = async (email) => {
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [
            email,
        ]);
        if (!user || user.length === 0) {
            throw new errorMsg('Usuario no encontrado');
        }
        return user;
    } catch (err) {
        console.error('Error al buscar el usuario', err);
        throw new errorMsg('Error al buscar el usuario', 500);
    }
};

export default loginUserQuery;
