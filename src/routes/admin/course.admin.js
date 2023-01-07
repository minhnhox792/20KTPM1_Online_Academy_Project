import express from 'express';
import courseController from '../../app/controllers/admin/course.controller.js';
import upload from '../../util/upload.js';

const router = express.Router();

router.delete('/:id', courseController.delete);
router.get('/all', courseController.all);
router.get('/add', courseController.add);
router.post('/add', upload, courseController.storeAdd);
router.get('/edit/:id', courseController.edit);
router.put('/edit/:id', upload, courseController.storeEdit);
router.get('/about/:id', courseController.about);
router.put('/lock/:id', courseController.lock);
router.put('/unlock/:id', courseController.unlock);

export default router;
