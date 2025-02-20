import { pool } from '../../db.js';

const loginUserQuery = async (email) => {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [
        email,
    ]);
    return user;
};

export default loginUserQuery;
