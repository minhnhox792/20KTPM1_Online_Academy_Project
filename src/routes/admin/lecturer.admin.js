import express from 'express';
import lecturerController from '../../app/controllers/admin/lecturer.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.delete(
  '/:id',
  authMiddleWare.isAuthenticated,
  lecturerController.delete
);
router.get('/all', authMiddleWare.isAuthenticated, lecturerController.all);
router.get('/add', authMiddleWare.isAuthenticated, lecturerController.add);
router.post(
  '/add',
  authMiddleWare.isAuthenticated,
  upload,
  lecturerController.storeAdd
);
router.get(
  '/edit/:id',
  authMiddleWare.isAuthenticated,
  lecturerController.edit
);
router.put(
  '/edit/:id',
  authMiddleWare.isAuthenticated,
  upload,
  lecturerController.storeEdit
);
router.get(
  '/profile/:id',
  authMiddleWare.isAuthenticated,
  lecturerController.profile
);
router.put(
  '/lock/:id',
  authMiddleWare.isAuthenticated,
  lecturerController.lock
);
router.put(
  '/unlock/:id',
  authMiddleWare.isAuthenticated,
  lecturerController.unlock
);

export default router;
