import express from 'express';
import userController from '../../app/controllers/UserController.js';

const router = express.Router();

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/login',userController.handlLogin)

export default router;
