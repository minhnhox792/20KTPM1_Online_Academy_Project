import express from 'express';
import lecturerController from '../../app/controllers/admin/lecturer.controller.js';
import upload from '../../util/upload.js';

const router = express.Router();

router.delete('/:id', lecturerController.delete);
router.get('/all', lecturerController.all);
router.get('/add', lecturerController.add);
router.post('/add', upload, lecturerController.storeAdd);
router.get('/edit/:id', lecturerController.edit);
router.put('/edit/:id', upload, lecturerController.storeEdit);
router.get('/profile/:id', lecturerController.profile);
router.put('/lock/:id', lecturerController.lock);
router.put('/unlock/:id', lecturerController.unlock);

export default router;
