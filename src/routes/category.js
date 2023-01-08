import express from 'express';
import categoryController from '../app/controllers/categoryController.js';
import authMiddleware from '../app/controllers/middleware/authMiddleware.js'
const router = express.Router();

router.get('/view/:id', authMiddleware.isAuthenticated, categoryController.view);
router.get('/subCategory/:id', authMiddleware.isAuthenticated,  categoryController.subCategory);
router.get('/nextSub/:id', authMiddleware.isAuthenticated,  categoryController.requestSubcatory);

export default router;
