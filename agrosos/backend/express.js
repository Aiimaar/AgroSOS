import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import plotsRoutes from './routes/plotsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import usersViewsRoutes from './routes/views-routes/usersViewsRoutes.js';
import plotListViewsRoutes from './routes/views-routes/plotListViewsRoutes.js';
import createPlotViewRoute from './routes/views-routes/createPlotViewRoute.js';
import sensorsRoutes from './routes/sensorsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import sensorValueRoutes from './routes/sensorValueRoutes.js';
import dotenv from 'dotenv';
import actuatorRoutes from './routes/actuatorRoutes.js';
import rulesRoutes from './routes/rulesRoutes.js';
import irrigationScheduleRoutes from './routes/irrigationScheduleRoutes.js';  // Nueva ruta importada

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
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', express.static(path.join(__dirname, 'public')));
dotenv.config();

sequelize.sync();

// Setting the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

// Rules routes
app.use('/api/rules', rulesRoutes);
// Irrigation Schedule routes (añadido)
// Irrigation Schedule routes
app.use("/api/irrigation_schedule", irrigationScheduleRoutes);

app.use('/views/rules', rulesRoutes);

app.use('/views/users', usersViewsRoutes);

app.use('/views/plot-list', plotListViewsRoutes);

app.use('/views/create-plot', createPlotViewRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
