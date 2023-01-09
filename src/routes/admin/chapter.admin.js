import express from 'express';
import chapterController from '../../app/controllers/admin/chapter.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.put(
  '/:id',
  upload,
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.edit
);

router.delete(
  '/overview/:id/:slug',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.deleteOverview
);
router.delete(
  '/basic/:id/:slug',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.deleteBasic
);
router.delete(
  '/master/:id/:slug',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.deleteMaster
);
router.delete(
  '/advanced/:id/:slug',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.deleteAdvanced
);

router.get(
  '/overview/:id',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.allOverview
);
router.post(
  '/overview/:id',
  upload,
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.addOverview
);

router.get(
  '/basic/:id',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.allBasic
);
router.post(
  '/basic/:id',
  upload,
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.addBasic
);

router.get(
  '/master/:id',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.allMaster
);
router.post(
  '/master/:id',
  upload,
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.addMaster
);

router.get(
  '/advanced/:id',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.allAdvanced
);
router.post(
  '/advanced/:id',
  authMiddleWare.isAuthenticatedAdmin,
  upload,
  chapterController.addAdvanced
);

router.get(
  '/video/:filename',
  authMiddleWare.isAuthenticatedAdmin,
  chapterController.video
);

export default router;
