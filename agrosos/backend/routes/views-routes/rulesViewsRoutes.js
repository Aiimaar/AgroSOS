import express from 'express';
import * as rulesViewsController from '../../controllers/views-controllers/rulesViewsController.js';

const router = express.Router();

router.get('/', rulesViewsController.getAllRules);
router.post('/', rulesViewsController.createRule);
router.put('/:id', rulesViewsController.updateRuleView);
router.delete('/:id', rulesViewsController.deleteRule);

export default router;
