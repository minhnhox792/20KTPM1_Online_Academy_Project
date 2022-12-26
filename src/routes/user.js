import express from 'express';
import userController from '../app/controllers/UserController.js';
import {check} from 'express-validator/check/index.js'

const router = express.Router();

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/login',userController.handlLogin)
router.post('/register', check('email').isEmail().withMessage('Please enter a valid email !') , userController.solveRegister)
router.get('/verifyOTP', userController.getverifyOTP)
router.post('/verifyOTP',userController.compareOTP)
router.post('/logout',userController.handleLogout)

router.get('/changePassword',userController.renderChangePassword)
router.post('/changePassword',userController.changePassword)
router.get('/profile', userController.renderProfile);
router.post('/profile', userController.updateProfile);

export default router;
