import express from 'express';
import actuatorController from '../controllers/actuatorController.js';

const router = express.Router();

router.get('/', actuatorController.getAllActuators);
router.post('/', actuatorController.createActuator);
router.put('/:id', actuatorController.updateActuator);
router.delete('/:id', actuatorController.deleteActuator);

export default router;
