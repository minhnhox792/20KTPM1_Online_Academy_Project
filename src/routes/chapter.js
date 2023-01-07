
import express from "express";
import chapterController from "../app/controllers/chapterController.js"; 
import upload from "../util/upload.js";



const router = express.Router();

router.put("/:id", upload, chapterController.edit)

// router.put('/:id', upload, chapterController.edit);

router.delete('/overview/:id/:slug', chapterController.deleteOverview);
router.delete('/basic/:id/:slug', chapterController.deleteBasic);
router.delete('/master/:id/:slug', chapterController.deleteMaster);
router.delete('/advanced/:id/:slug', chapterController.deleteAdvanced);

router.get('/overview/:id', chapterController.allOverview);
router.post('/overview/:id', upload, chapterController.addOverview);

router.get('/basic/:id', chapterController.allBasic);
router.post('/basic/:id', upload, chapterController.addBasic);

router.get('/master/:id', chapterController.allMaster);
router.post('/master/:id', upload, chapterController.addMaster);

router.get('/advanced/:id', chapterController.allAdvanced);
router.post('/advanced/:id', upload, chapterController.addAdvanced); 


router.get('/image/:filename', chapterController.imageRender);
router.get('/video/:filename', chapterController.video);


export default router