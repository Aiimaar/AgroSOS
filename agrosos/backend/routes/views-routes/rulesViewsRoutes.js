import express from 'express';
import * as rulesViewsController from '../../controllers/views-controllers/rulesViewsController.js';

const router = express.Router();

// Ruta para obtener todas las reglas
router.get('/', rulesViewsController.getAllRules);

// Ruta para obtener una regla por ID (para editar)
router.get('/edit-rule/:id', rulesViewsController.getRuleById);

// Ruta para crear una nueva regla
router.post('/', rulesViewsController.createRule);

// Ruta para actualizar una regla existente (ajuste aquí)
router.put('/edit-rule/:id', rulesViewsController.updateRuleView);

// Ruta para eliminar una regla
router.delete('/:id', rulesViewsController.deleteRule);

export default router;
