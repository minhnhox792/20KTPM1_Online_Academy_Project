import express from 'express';
import categoryController from '../app/controllers/categoryController.js';

const router = express.Router();

router.get('/view/:id', categoryController.view);
router.get('/subCategory/:id', categoryController.subCategory);
router.get('/nextSub/:id', categoryController.requestSubcatory);

export default router;
