import express from 'express';
import chapterController from '../../app/controllers/admin/chapter.controller.js';

const router = express.Router();

router.get('/overview', chapterController.allOverview);
router.get('/basic', chapterController.allBasic);
router.get('/master', chapterController.allMaster);
router.get('/advanced', chapterController.allAdvanced);

export default router;
