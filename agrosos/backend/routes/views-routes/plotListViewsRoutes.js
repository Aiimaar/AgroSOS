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

// Rutas para las vistas EJS y acciones CRUD
router.get("/", plotController.getPlots); // Muestra la lista de terrenos en una vista
router.put("/update/:id", upload.single('image'), plotController.updatePlot); // Actualiza un terreno existente
router.delete("/delete/:id", plotController.deletePlot); // Elimina un terreno

export default router;
