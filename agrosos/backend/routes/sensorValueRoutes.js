import express from 'express';
import * as sensorValue from '../controllers/sensorValueController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

// Rutas de valores de sensor
router.get('/', authenticateToken, sensorValue.getSensorValues);
router.post('/', authenticateToken, sensorValue.createSensorValue);
router.get('/:id', authenticateToken, sensorValue.getSensorValueById);
router.delete('/:id', authenticateToken, sensorValue.deleteSensorValue);
router.get('/plot/:plotId', authenticateToken, sensorValue.getSensorValueByPlotId);

export default router;
