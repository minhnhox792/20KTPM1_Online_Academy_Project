import express from 'express';
import courseController from '../../app/controllers/admin/course.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.delete('/:id', authMiddleWare.isAuthenticated, courseController.delete);
router.get('/all', authMiddleWare.isAuthenticated, courseController.all);
router.get('/add', authMiddleWare.isAuthenticated, courseController.add);
router.post(
  '/add',
  authMiddleWare.isAuthenticated,
  upload,
  courseController.storeAdd
);
router.get('/edit/:id', authMiddleWare.isAuthenticated, courseController.edit);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticated,
  upload,
  courseController.storeEdit
);
router.get(
  '/about/:id',
  authMiddleWare.isAuthenticated,
  courseController.about
);
router.put('/lock/:id', authMiddleWare.isAuthenticated, courseController.lock);
router.put(
  '/unlock/:id',
  authMiddleWare.isAuthenticated,
  courseController.unlock
);

export default router;
