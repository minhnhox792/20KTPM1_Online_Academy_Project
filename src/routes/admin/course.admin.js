import express from 'express';
import courseController from '../../app/controllers/admin/course.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.delete('/:id', authMiddleWare.isAuthenticatedAdmin, courseController.delete);
router.get('/all', authMiddleWare.isAuthenticatedAdmin, courseController.all);
router.get('/add', authMiddleWare.isAuthenticatedAdmin, courseController.add);
router.post(
  '/add',
  authMiddleWare.isAuthenticatedAdmin,
  upload,
  courseController.storeAdd
);
router.get('/edit/:id', authMiddleWare.isAuthenticatedAdmin, courseController.edit);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticatedAdmin,
  upload,
  courseController.storeEdit
);
router.get(
  '/about/:id',
  authMiddleWare.isAuthenticatedAdmin,
  courseController.about
);
router.put('/lock/:id', authMiddleWare.isAuthenticatedAdmin, courseController.lock);
router.put(
  '/unlock/:id',
  authMiddleWare.isAuthenticatedAdmin,
  courseController.unlock
);

export default router;
