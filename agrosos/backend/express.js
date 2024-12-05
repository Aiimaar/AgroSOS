import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import plotsRoutes from './routes/plotsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import sensorsRoutes from './routes/sensorsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import sensorValueRoutes from './routes/sensorValueRoutes.js';
import dotenv from 'dotenv';
import actuatorRoutes from './routes/actuatorRoutes.js';
import irrigationScheduleRoutes from './routes/irrigationScheduleRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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

// Crop routes
app.use("/api/crops", cropRoutes);

// Sensor Value routes
app.use("/api/sensor_value", sensorValueRoutes);

// Actuators routes
app.use('/api/actuators', actuatorRoutes);

// Irrigation Schedule routes
app.use("/api/irrigation_schedule", irrigationScheduleRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
