import { pool } from '../../db.js';
import { v4 as uuidv4 } from 'uuid';

export const checkIfUserExists = async (email) => {
    const [rows] = await pool.query(`SELECT id FROM users WHERE email = ?`, [
        email,
    ]);
    return rows;
};

export const createUser = async (name, email, hashedPassword, regCode) => {
    const [result] = await pool.query(
        `INSERT INTO users (name, email, password, role, createdAt, regCode) VALUES (?, ?, ?, 'user', NOW(), ?)`,
        [name, email, hashedPassword, regCode]
    );
    return result;
};

export const generateActivationCode = () => {
    return uuidv4();
};
