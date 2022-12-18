import express from 'express';
import lecturerController from '../../app/controllers/admin/lecturer.controller.js';

const router = express.Router();

router.delete('/:id', lecturerController.delete);
router.get('/all', lecturerController.all);
router.get('/add', lecturerController.add);
router.post('/add', lecturerController.storeAdd);
router.get('/edit/:id', lecturerController.edit);
router.put('/edit/:id', lecturerController.storeEdit);
router.get('/profile/:id', lecturerController.profile);

export default router;
