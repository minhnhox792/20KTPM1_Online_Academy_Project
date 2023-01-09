import express from 'express';
import dashboardController from '../../app/controllers/admin/dashboard.controller.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';
import upload from '../../util/upload.js';

const router = express.Router();

router.get('/', authMiddleWare.isAuthenticatedAdmin, dashboardController.index);
router.post('/logout', dashboardController.logout);
router.get('/profile', authMiddleWare.isAuthenticatedAdmin, dashboardController.profile);
router.get('/profile/edit', authMiddleWare.isAuthenticatedAdmin, dashboardController.edit);
router.put('/profile/edit',upload, authMiddleWare.isAuthenticatedAdmin, dashboardController.storeEdit);

export default router;
