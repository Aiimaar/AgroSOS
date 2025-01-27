import express from 'express';
import {
  getAllRules,
  getRuleById,
  createRule,
  updateRule,
  deleteRule,
} from '../controllers/rulesViewsController.js';

const router = express.Router();

// Ruta para obtener todas las reglas
router.get('/', getAllRules);

// Ruta para obtener una regla por ID
router.get('/:id', getRuleById);

// Ruta para crear una nueva regla
router.post('/', createRule);

// Ruta para actualizar una regla existente
router.put('/:id', updateRule);

// Ruta para eliminar una regla
router.delete('/:id', deleteRule);

export default router;
