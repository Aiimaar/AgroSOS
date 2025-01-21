import express from 'express';
import * as rulesViewsController from '../../controllers/views-controllers/rulesViewsController.js';

const router = express.Router();

// Ruta para obtener todas las reglas
router.get('/', rulesViewsController.getAllRules);

// Ruta para obtener una regla por ID (para editar)
router.get('/edit-rule/:id', rulesViewsController.getRuleById); // Ajuste aquí

// Ruta para crear una nueva regla
router.post('/', rulesViewsController.createRule);

// Ruta para actualizar una regla existente
router.put('/:id', rulesViewsController.updateRule);

// Ruta para eliminar una regla
router.delete('/:id', rulesViewsController.deleteRule);

export default router;
