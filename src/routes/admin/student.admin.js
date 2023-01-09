import express from 'express';
import studentController from '../../app/controllers/admin/student.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.delete('/:id', authMiddleWare.isAuthenticated, studentController.delete);
router.get('/all', authMiddleWare.isAuthenticated, studentController.all);
router.get('/add', authMiddleWare.isAuthenticated, studentController.add);
router.post(
  '/add',
  authMiddleWare.isAuthenticated,
  upload,
  studentController.storeAdd
);
router.get('/edit/:id', authMiddleWare.isAuthenticated, studentController.edit);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticated,
  upload,
  studentController.storeEdit
);
router.get(
  '/profile/:id',
  authMiddleWare.isAuthenticated,
  studentController.profile
);
router.put('/lock/:id', authMiddleWare.isAuthenticated, studentController.lock);
router.put(
  '/unlock/:id',
  authMiddleWare.isAuthenticated,
  studentController.unlock
);

export default router;
