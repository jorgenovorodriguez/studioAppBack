import { Router } from 'express';
import registerUser from '../controllers/user/registerUser.controller.js';
import loginUser from '../controllers/user/loginUser.controller.js';
import activateUser from '../controllers/user/activateUser.controller.js';
import sendRecoverPassCode from '../controllers/user/sendRecoverPassCode.controller.js';
import updatePassWithCode from '../controllers/user/updatePassWithCode.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/activate/:registrationCode', activateUser);
router.post('/recover-password', sendRecoverPassCode);
router.post('/update-password', updatePassWithCode);

export default router;
