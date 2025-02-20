import { SMTP_PASS, SMTP_MAIL, SMTP_HOST, SMTP_PORT } from '../config.js';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_MAIL,
        pass: SMTP_PASS,
    },
});

const sendMail = async (email, subject, body) => {
    const mailOptions = {
        from: SMTP_MAIL,
        to: email,
        subject,
        text: body,
    };

    await transport.sendMail(mailOptions);
};

export default sendMail;
