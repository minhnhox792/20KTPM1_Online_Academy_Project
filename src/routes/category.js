import express from 'express';
import categoryController from '../app/controllers/categoryController.js';

const router = express.Router();

router.get('/view/:id', categoryController.view);

export default router;
