import express from 'express';
import courseController from '../../app/controllers/admin/course.controller.js';

const router = express.Router();

router.delete('/:id', courseController.delete);
router.get('/all', courseController.all);
router.get('/add', courseController.add);
router.post('/add', courseController.storeAdd);
router.get('/edit/:id', courseController.edit);
router.put('/edit/:id', courseController.storeEdit);
router.get('/about/:id', courseController.about);

export default router;
