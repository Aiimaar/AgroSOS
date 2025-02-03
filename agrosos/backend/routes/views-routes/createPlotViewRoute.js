import express from 'express';
import multer from 'multer';
import * as plotController from '../../controllers/views-controllers/plotListViewsController.js';

const router = express.Router();

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/", plotController.renderCreatePlotPage);// Crea un nuevo terreno
router.post('/', upload.single('image'), async (req, res) => {
  try {
      const { name, size, unit, imageOption, color, farmer_id } = req.body;
      const image = req.file ? req.file.filename : null;

      await Plot.create({ name, size, unit, imageOption, color, image });
      res.status(201).json({ message: 'Terreno creado exitosamente' });
  } catch (error) {
      console.error('Error al crear el terreno:', error);
      res.status(500).json({ error: 'Error al crear el terreno' });
  }
});

export default router;