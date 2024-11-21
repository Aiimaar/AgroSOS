import express from 'express';
import multer from 'multer';
import * as userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    // Asignamos un nombre único a la imagen para evitar conflictos
    cb(null, Date.now() + '-' + file.originalname);
  }
});


// Inicialización de multer
const upload = multer({ storage: storage });

// Rutas
router.get("/", authenticateToken, userController.getUsers);
router.get("/:id", authenticateToken, userController.getUserById);

router.post("/", userController.createUser);

// Ruta para actualizar el perfil de usuario y cargar una imagen
router.put("/:id", authenticateToken, upload.single('profile_image'), userController.updateUser);

// Ruta para eliminar el usuario
router.delete("/:id", authenticateToken, userController.deleteUser);

export default router;
