import express from 'express';
import dashboardController from '../../app/controllers/admin/dashboard.controller.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleWare.isAuthenticatedAdmin, dashboardController.index);
router.post('/logout', dashboardController.logout);

export default router;
