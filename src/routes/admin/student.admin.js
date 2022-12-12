import express from 'express';
import studentController from '../../app/controllers/admin/student.controller.js';

const router = express.Router();

router.get('/all', studentController.all);
router.get('/add', studentController.add);
router.get('/edit', studentController.edit);
router.post('/edit', studentController.edit);
router.get('/profile', studentController.profile);

export default router;
