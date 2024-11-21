import express from 'express';
import * as cropController from '../controllers/cropController.js';

const router = express.Router();

router.get('/', cropController.getCrops);
router.post('/', cropController.createCrop);
router.put('/:id', cropController.updateCrop);
router.delete('/:id', cropController.deleteCrop);

export default router;
