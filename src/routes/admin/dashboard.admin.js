import express from 'express';
import dashboardController from '../../app/controllers/admin/dashboard.controller.js';

const router = express.Router();

router.get('/', dashboardController.index);

export default router;
