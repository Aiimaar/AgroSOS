import express from 'express';
import * as userListViewsController from '../../controllers/views-controllers/userListViewsController.js';

const router = express.Router();

// Rutas sin autenticación
router.get("/", userListViewsController.getUsers);  
router.post("/", userListViewsController.createUser);
router.delete('/delete/:userId', userListViewsController.deleteUser);  
router.put('/update/:userId', userListViewsController.updateUser); 

export default router;
