import express from 'express';
import { getAllRules, getRuleById, getRulesByCrop, createRule, updateRule, deleteRule } from '../controllers/ruleController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

// Obtener todas las reglas
router.get('/', authenticateToken, getAllRules);

// Obtener reglas por crop_id
router.get('/crop', authenticateToken, getRulesByCrop);

// Obtener una regla por rule_id
router.get('/:id', authenticateToken, getRuleById);

// Crear una nueva regla
router.post('/', authenticateToken, createRule);

// Actualizar una regla
router.put('/:id', authenticateToken, updateRule);

// Eliminar una regla
router.delete('/:id', authenticateToken, deleteRule);

export default router;
