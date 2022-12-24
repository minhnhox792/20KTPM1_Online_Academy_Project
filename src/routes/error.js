import express from 'express';
import errorController from '../app/controllers/errorController.js';

const router = express.Router();

router.get('/500', errorController.view);

export default router;
