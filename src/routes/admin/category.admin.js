import express from 'express';
import categoryController from '../../app/controllers/admin/category.controller.js';

const router = express.Router();

router.get('/all', categoryController.all);

export default router;
