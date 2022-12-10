import express from 'express';
import dashboardController from '../app/controllers/dashboard.controller.js';

const router = express.Router();

router.get('/dashboard', dashboardController.index);

export default router;
