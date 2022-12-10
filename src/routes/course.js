import express from 'express';
import courseController from '../app/controllers/courseController.js';

const router = express.Router();

router.get('/', courseController.registerCourse);

export default router;
