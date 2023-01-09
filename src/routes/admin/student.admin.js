import express from 'express';
import studentController from '../../app/controllers/admin/student.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.delete('/:id', authMiddleWare.isAuthenticatedAdmin, studentController.delete);
router.get('/all', authMiddleWare.isAuthenticatedAdmin, studentController.all);
router.get('/add', authMiddleWare.isAuthenticatedAdmin, studentController.add);
router.post(
  '/add',
  authMiddleWare.isAuthenticatedAdmin,
  upload,
  studentController.storeAdd
);
router.get('/edit/:id', authMiddleWare.isAuthenticatedAdmin, studentController.edit);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticatedAdmin,
  upload,
  studentController.storeEdit
);
router.get(
  '/profile/:id',
  authMiddleWare.isAuthenticatedAdmin,
  studentController.profile
);
router.put('/lock/:id', authMiddleWare.isAuthenticatedAdmin, studentController.lock);
router.put(
  '/unlock/:id',
  authMiddleWare.isAuthenticatedAdmin,
  studentController.unlock
);

export default router;
