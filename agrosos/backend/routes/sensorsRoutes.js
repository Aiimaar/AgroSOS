import express from 'express';
import * as sensorController from '../controllers/sensorController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/", sensorController.getSensors);
router.post("/", sensorController.createSensor);  // Esta ruta debe ser correcta
router.put("/:id", sensorController.updateSensor);
router.delete("/:id", sensorController.deleteSensor);

export default router;
