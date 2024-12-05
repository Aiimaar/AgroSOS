// routes/irrigationScheduleRoutes.js
import express from 'express';
import { createIrrigationSchedule, getIrrigationSchedules } from '../controllers/irrigationScheduleController.js';  // Asegúrate de tener este controlador
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

// Ruta para crear una nueva programación de riego
// Asegúrate de que el middleware authenticateToken esté funcionando correctamente
router.post('/', authenticateToken, createIrrigationSchedule);

// Ruta para obtener todas las programaciones de riego
router.get('/', authenticateToken, getIrrigationSchedules);

export default router;
