import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import plotsRoutes from './routes/plotsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import userListViewsRoutes from './routes/views-routes/userListViewsRoutes.js';
import sensorsRoutes from './routes/sensorsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import sensorValueRoutes from './routes/sensorValueRoutes.js';
import dotenv from 'dotenv';
import actuatorRoutes from './routes/actuatorRoutes.js';
import rulesRoutes from './routes/rulesRoutes.js';
import irrigationScheduleRoutes from './routes/irrigationScheduleRoutes.js';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import { isAuthenticated } from './middleware/isAuthenticated.js';
import authViewRoutes from './routes/views-routes/authViewRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// **Middleware para procesar datos de formularios HTML**
app.use(express.urlencoded({ extended: true })); // <-- Agregado para manejar datos "x-www-form-urlencoded"

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configura el almacenamiento de sesiones en Sequelize
const SequelizeSessionStore = SequelizeStore(session.Store);
const sessionStore = new SequelizeSessionStore({
  db: sequelize,
});

await sessionStore.sync();

// Configura express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'tu_secreto',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 horas
      httpOnly: true,
      secure: false, // Cambiar a true si usas HTTPS
    },
  })
);

// Configura el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sincroniza Sequelize
await sequelize.sync();

// Configura las rutas de la API
app.use('/api/plots', plotsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sensors', sensorsRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/sensor_value', sensorValueRoutes);
app.use('/api/actuators', actuatorRoutes);
app.use('/api/rules', rulesRoutes);
app.use('/api/irrigation_schedule', irrigationScheduleRoutes);

// Configura las rutas de vistas
app.use('/views/auth', authViewRoutes);
app.use('/views/userList', isAuthenticated, userListViewsRoutes);

// Rutas estáticas
app.use('/', express.static(path.join(__dirname, 'public')));

// Manejo de errores
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
