import { Router } from 'express';
import registerUser from '../controllers/user/registerUser.controller.js';
import loginUser from '../controllers/user/loginUser.controller.js';
import activateUser from '../controllers/user/activateUser.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/activate/:registrationCode', activateUser);

export default router;
