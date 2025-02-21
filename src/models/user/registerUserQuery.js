import { pool } from '../../db.js';
import { v4 as uuidv4 } from 'uuid';
import { errorMsg } from '../../services/manageError.js';

export const createUser = async (name, email, hashedPassword, regCode) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO users (name, email, password, role, createdAt, regCode) VALUES (?, ?, ?, 'user', NOW(), ?)`,
            [name, email, hashedPassword, regCode]
        );
        return result;
    } catch (err) {
        console.error('Error al crear el usuario', err);
        throw new errorMsg('Error al crear el usuario', 500);
    }
};

export const generateActivationCode = () => {
    return uuidv4();
};
