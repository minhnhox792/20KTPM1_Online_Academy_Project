import express from 'express';
import categoryController from '../../app/controllers/admin/category.controller.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', authMiddleWare.isAuthenticated, categoryController.all);
router.post('/all', authMiddleWare.isAuthenticated, categoryController.add);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticated,
  categoryController.edit
);
router.delete(
  '/:id',
  authMiddleWare.isAuthenticated,
  categoryController.delete
);
router.post('/:id', authMiddleWare.isAuthenticated, categoryController.addSub);
router.delete(
  '/:id/:slug',
  authMiddleWare.isAuthenticated,
  categoryController.deleteSub
);
router.put(
  '/:id/:slug',
  authMiddleWare.isAuthenticated,
  categoryController.editSub
);

export default router;
