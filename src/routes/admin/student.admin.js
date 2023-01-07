import express from 'express';
import studentController from '../../app/controllers/admin/student.controller.js';
import upload from '../../util/upload.js';

const router = express.Router();

router.delete('/:id', studentController.delete);
router.get('/all', studentController.all);
router.get('/add', studentController.add);
router.post('/add', upload, studentController.storeAdd);
router.get('/edit/:id', studentController.edit);
router.put('/edit/:id', upload, studentController.storeEdit);
router.get('/profile/:id', studentController.profile);
router.put('/lock/:id', studentController.lock);
router.put('/unlock/:id', studentController.unlock);

export default router;
