import express from 'express';
import courseController from '../app/controllers/courseController.js';

const router = express.Router();

router.get('/:id', courseController.registerCourse);
router.post('/comment',courseController.commentCourse)
// router.get('/video',courseController.videoCourse)
export default router;
