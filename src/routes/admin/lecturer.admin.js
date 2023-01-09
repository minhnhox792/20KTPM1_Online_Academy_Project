import express from 'express';
import lecturerController from '../../app/controllers/admin/lecturer.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.delete(
  '/:id',
  authMiddleWare.isAuthenticatedAdmin,
  lecturerController.delete
);
router.get('/all', authMiddleWare.isAuthenticatedAdmin, lecturerController.all);
router.get('/add', authMiddleWare.isAuthenticatedAdmin, lecturerController.add);
router.post(
  '/add',
  authMiddleWare.isAuthenticatedAdmin,
  upload,
  lecturerController.storeAdd
);
router.get(
  '/edit/:id',
  authMiddleWare.isAuthenticatedAdmin,
  lecturerController.edit
);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticatedAdmin,
  upload,
  lecturerController.storeEdit
);
router.get(
  '/profile/:id',
  authMiddleWare.isAuthenticatedAdmin,
  lecturerController.profile
);
router.put(
  '/lock/:id',
  authMiddleWare.isAuthenticatedAdmin,
  lecturerController.lock
);
router.put(
  '/unlock/:id',
  authMiddleWare.isAuthenticatedAdmin,
  lecturerController.unlock
);

export default router;
