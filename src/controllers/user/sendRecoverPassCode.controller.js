import checkIfUserExists from '../../models/user/checkUserQuery.js';
import { recoverPassCodeMail } from '../../models/user/recoverPassUserQuery.js';
import randomstring from 'randomstring';
import sendCode from '../../services/sendMail.js';
import { errorMsg } from '../../services/manageError.js';

const sendRecoverPassCode = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            errorMsg('Faltan campos', 400);
        }

        const user = await checkIfUserExists(email);
        if (!user) {
            errorMsg('Usuario no encontrado', 404);
        }

        const recoverPassCode = randomstring.generate(4);
        const expireAt = new Date();
        expireAt.setMinutes(expireAt.getMinutes() + 30);

        await recoverPassCodeMail(email, recoverPassCode, expireAt);

        const emailSubject = 'StudioApp: Recuperación de contraseña';
        const emailBody = `
        Introduce el siguiente código en nuestra plataforma para crear una nueva contraseña: ${recoverPassCode}

        Si no has sido tú, ignora este email.
        `;

        await sendCode(email, emailSubject, emailBody);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación enviado',
        });
    } catch (error) {
        next(error);
    }
};

export default sendRecoverPassCode;
