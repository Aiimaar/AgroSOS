import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get("/", userController.getUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;

