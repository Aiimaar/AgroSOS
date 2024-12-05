import express from 'express';
import { getAllRules, getRuleById, getRulesByCrop, createRule, updateRule, deleteRule } from '../controllers/ruleController.js';

const router = express.Router();

// Obtener todas las reglas
router.get('/', getAllRules);

// Obtener reglas por crop_id
router.get('/crop', getRulesByCrop);

// Obtener una regla por rule_id
router.get('/:id', getRuleById);

// Crear una nueva regla
router.post('/', createRule);

// Actualizar una regla
router.put('/:id', updateRule);

// Eliminar una regla
router.delete('/:id', deleteRule);

export default router;
