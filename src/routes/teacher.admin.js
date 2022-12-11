import express from 'express';
import teacherController from '../app/controllers/teacher.controller.js';

const router = express.Router();

router.get('/all', teacherController.all);
router.get('/add', teacherController.add);
router.get('/edit', teacherController.edit);
router.post('/edit', teacherController.edit);
router.get('/profile', teacherController.profile);

export default router;
