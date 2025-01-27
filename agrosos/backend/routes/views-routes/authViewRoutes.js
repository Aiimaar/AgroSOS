import express from 'express';
import {handleLogin, handleLogout, renderLogin } from '../../controllers/views-controllers/authViewController.js';

const router = express.Router();

// Ruta para mostrar la vista de login
router.get('/login', renderLogin);

// Ruta para manejar el login
router.post('/login', handleLogin);

// Ruta para manejar el logout
router.post('/logout', handleLogout);

export default router;
