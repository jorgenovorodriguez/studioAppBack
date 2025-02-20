import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_MAIL = process.env.SMTP_MAIL;
export const SMTP_PASS = process.env.SMTP_PASS;
export const SMTP_PORT = process.env.SMTP_PORT;
