import express from 'express';
import courseController from '../app/controllers/courseController.js';

const router = express.Router();

router.post('/comment',courseController.commentCourse)
router.get('/pathVideo',courseController.pathVideo)
router.get('/:id', courseController.registerCourse)



export default router;
