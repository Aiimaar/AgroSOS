import express from 'express';
import * as sensorValue from '../controllers/sensorValueController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

// Rutas de valores de sensor
router.get('/', authenticateToken, sensorValue.getSensorValues);
router.get('/:id', authenticateToken, sensorValue.getSensorValueById);
router.get('/plot/:plotId', sensorValue.getSensorValueByPlotId);
router.delete('/:id', authenticateToken, sensorValue.deleteSensorValue);
router.put('/:id', authenticateToken, sensorValue.updateSensorValue);
router.post('/', authenticateToken, sensorValue.createSensorValue);
export default router;
