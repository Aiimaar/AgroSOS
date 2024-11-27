import express from 'express';
import { getCrops, createCrop, getCropById, updateCrop, deleteCrop, getCropByPlotId } from '../controllers/cropController.js';

const router = express.Router();

// Rutas de cultivos
router.get('/', getCrops);
router.post('/', createCrop);
router.get('/:id', getCropById);
router.put('/:id', updateCrop);
router.delete('/:id', deleteCrop);
router.get('/plot/:plotId', getCropByPlotId)

export default router;
