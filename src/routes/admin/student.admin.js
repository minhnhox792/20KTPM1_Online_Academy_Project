import express from 'express';
import studentController from '../../app/controllers/admin/student.controller.js';

const router = express.Router();

router.delete('/:id', studentController.delete);
router.get('/all', studentController.all);
router.get('/add', studentController.add);
router.post('/add', studentController.storeAdd);
router.get('/edit/:id', studentController.edit);
router.put('/edit/:id', studentController.storeEdit);
router.get('/profile/:id', studentController.profile);

export default router;
