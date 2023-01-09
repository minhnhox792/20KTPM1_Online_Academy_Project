import express from 'express';
import chapterController from '../../app/controllers/admin/chapter.controller.js';
import upload from '../../util/upload.js';
import authMiddleWare from '../../app/controllers/middleware/authMiddleware.js';

const router = express.Router();

router.put(
  '/:id',
  upload,
  authMiddleWare.isAuthenticated,
  chapterController.edit
);

router.delete(
  '/overview/:id/:slug',
  authMiddleWare.isAuthenticated,
  chapterController.deleteOverview
);
router.delete(
  '/basic/:id/:slug',
  authMiddleWare.isAuthenticated,
  chapterController.deleteBasic
);
router.delete(
  '/master/:id/:slug',
  authMiddleWare.isAuthenticated,
  chapterController.deleteMaster
);
router.delete(
  '/advanced/:id/:slug',
  authMiddleWare.isAuthenticated,
  chapterController.deleteAdvanced
);

router.get(
  '/overview/:id',
  authMiddleWare.isAuthenticated,
  chapterController.allOverview
);
router.post(
  '/overview/:id',
  upload,
  authMiddleWare.isAuthenticated,
  chapterController.addOverview
);

router.get(
  '/basic/:id',
  authMiddleWare.isAuthenticated,
  chapterController.allBasic
);
router.post(
  '/basic/:id',
  upload,
  authMiddleWare.isAuthenticated,
  chapterController.addBasic
);

router.get(
  '/master/:id',
  authMiddleWare.isAuthenticated,
  chapterController.allMaster
);
router.post(
  '/master/:id',
  upload,
  authMiddleWare.isAuthenticated,
  chapterController.addMaster
);

router.get(
  '/advanced/:id',
  authMiddleWare.isAuthenticated,
  chapterController.allAdvanced
);
router.post(
  '/advanced/:id',
  authMiddleWare.isAuthenticated,
  upload,
  chapterController.addAdvanced
);

router.get(
  '/video/:filename',
  authMiddleWare.isAuthenticated,
  chapterController.video
);

export default router;
