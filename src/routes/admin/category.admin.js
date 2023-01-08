import express from 'express';
import categoryController from '../../app/controllers/admin/category.controller.js';

const router = express.Router();

router.get('/all', categoryController.all);
router.post('/all', categoryController.add);
router.put('/edit/:id', categoryController.edit);
router.delete('/:id', categoryController.delete);
router.post('/:id', categoryController.addSub);
router.delete('/:id/:slug', categoryController.deleteSub);
router.put('/:id/:slug', categoryController.editSub);

export default router;
