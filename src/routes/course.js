import express from 'express';
import courseController from '../app/controllers/courseController.js';

const router = express.Router();

router.get('/:id', courseController.registerCourse);

export default router;
