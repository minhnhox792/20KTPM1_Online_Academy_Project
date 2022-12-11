import express from 'express';
import courseController from '../app/controllers/course.controller.js';

const router = express.Router();

router.get('/all', courseController.all);
router.get('/add', courseController.add);
router.get('/edit', courseController.edit);
router.get('/about', courseController.about);

export default router;
