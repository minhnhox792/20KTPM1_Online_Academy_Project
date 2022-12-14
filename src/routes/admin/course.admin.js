import express from 'express';
import courseController from '../../app/controllers/admin/course.controller.js';

const router = express.Router();

router.get('/all', courseController.all);
router.get('/add', courseController.add);
router.get('/edit', courseController.edit);
router.get('/about/:id', courseController.about);

export default router;
