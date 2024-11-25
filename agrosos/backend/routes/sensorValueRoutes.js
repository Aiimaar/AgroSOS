import express from 'express';
import * as sensorValue from '../controllers/sensorValueController.js';

const router = express.Router();

// Rutas de valores de sensor
router.get('/', sensorValue.getSensorValues);
router.post('/', sensorValue.createSensorValue);
router.get('/:id', sensorValue.getSensorValueById);
router.delete('/:id', sensorValue.deleteSensorValue);
router.get('/plot/:plotId', sensorValue.getSensorValueByPlotId);

export default router;
