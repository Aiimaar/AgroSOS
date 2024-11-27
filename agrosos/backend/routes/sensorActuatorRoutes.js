import express from 'express';
import sensorActuatorController from '../controllers/sensorActuatorController.js';

const router = express.Router();

router.get('/', sensorActuatorController.getAllSensorActuators);
router.post('/', sensorActuatorController.createSensorActuator);
router.delete('/:id', sensorActuatorController.deleteSensorActuator);

export default router;
