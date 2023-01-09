import express from 'express';
import categoryController from '../../app/controllers/admin/category.controller.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', authMiddleWare.isAuthenticatedAdmin, categoryController.all);
router.post('/all', authMiddleWare.isAuthenticatedAdmin, categoryController.add);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticatedAdmin,
  categoryController.edit
);
router.delete(
  '/:id',
  authMiddleWare.isAuthenticatedAdmin,
  categoryController.delete
);
router.post('/:id', authMiddleWare.isAuthenticatedAdmin, categoryController.addSub);
router.delete(
  '/:id/:slug',
  authMiddleWare.isAuthenticatedAdmin,
  categoryController.deleteSub
);
router.put(
  '/:id/:slug',
  authMiddleWare.isAuthenticatedAdmin,
  categoryController.editSub
);

export default router;
