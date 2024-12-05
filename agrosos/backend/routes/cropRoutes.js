import express from 'express';
import multer from 'multer';
import { getCrops, createCrop, getCropById, updateCrop, deleteCrop, getCropByPlotId } from '../controllers/cropController.js';

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rutas de cultivos
router.get('/', getCrops);
router.post('/', upload.fields([{ name: 'crop_image' }, { name: 'graphic_image' }]), createCrop);
router.get('/:id', getCropById);
router.put('/:id', upload.fields([{ name: 'crop_image' }, { name: 'graphic_image' }]), updateCrop);
router.delete('/:id', deleteCrop);
router.get('/plot/:plotId', getCropByPlotId);

export default router;
