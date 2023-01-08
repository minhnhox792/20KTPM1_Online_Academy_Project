import express from 'express';
import courseController from '../app/controllers/courseController.js';
import upload from '../util/upload.js';
const router = express.Router();

router.get('/teacherAdd', courseController.teacherAdd);
router.post('/teacherAdd', upload, courseController.postAdd);
router.get('/edit/:id', courseController.edit);
router.put('/edit/:id', upload, courseController.storeEdit);
router.post('/comment', courseController.commentCourse);
router.get('/pathVideo', courseController.pathVideo);
router.get('/about/:id', courseController.about);
router.get('/:id', courseController.registerCourse);

export default router;
