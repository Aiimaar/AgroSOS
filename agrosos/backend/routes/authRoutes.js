import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticateBasic } from '../middleware/authenticateBasic.js';

const router = express.Router();

router.post('/register', authenticateBasic, register);
router.post('/login', authenticateBasic,  login);

export default router;
