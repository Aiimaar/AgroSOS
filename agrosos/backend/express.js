import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import plotsRoutes from './routes/plotsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import sensorsRoutes from './routes/sensorsRoutes.js';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
dotenv.config();

sequelize.sync();

// Plot routes
app.use("/api/plots", plotsRoutes);

// User routes
app.use("/api/users", usersRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Sensor routes
app.use("/api/sensors", sensorsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
