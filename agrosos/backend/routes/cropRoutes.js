import express from 'express';
import multer from 'multer';
import { getCrops, createCrop, getCropById, updateCrop, deleteCrop, getCropByPlotId } from '../controllers/cropController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

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
router.get('/', authenticateToken, getCrops);
router.post('/', authenticateToken, upload.fields([{ name: 'crop_image' }, { name: 'graphic_image' }]), createCrop);
router.get('/:id', authenticateToken, getCropById);
router.put('/:id', authenticateToken, upload.fields([{ name: 'crop_image' }, { name: 'graphic_image' }]), updateCrop);
router.delete('/:id', authenticateToken, deleteCrop);
router.get('/plot/:plotId', authenticateToken, getCropByPlotId);

export default router;
