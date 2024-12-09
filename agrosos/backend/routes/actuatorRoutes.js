import express from 'express';
import actuatorController from '../controllers/actuatorController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/', authenticateToken, actuatorController.getAllActuators);
router.post('/', authenticateToken, actuatorController.createActuator);
router.put('/:id', authenticateToken, actuatorController.updateActuator);
router.delete('/:id', authenticateToken, actuatorController.deleteActuator);

export default router;
