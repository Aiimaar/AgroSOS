import express from 'express';
import * as sensorController from '../controllers/sensorController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/", authenticateToken, sensorController.getSensors);
router.post("/", authenticateToken, sensorController.createSensor);
router.put("/:id", authenticateToken, sensorController.updateSensor);
router.delete("/:id", authenticateToken, sensorController.deleteSensor);

export default router;