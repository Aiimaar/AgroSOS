import { WebSocketServer, WebSocket } from 'ws';
import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import { isAuthenticated } from './middleware/isAuthenticated.js';
import webPush from 'web-push';

// Importar rutas
import plotsRoutes from './routes/plotsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import sensorsRoutes from './routes/sensorsRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import sensorValueRoutes from './routes/sensorValueRoutes.js';
import actuatorRoutes from './routes/actuatorRoutes.js';
import rulesRoutes from './routes/rulesRoutes.js';
import irrigationScheduleRoutes from './routes/irrigationScheduleRoutes.js';
import authViewRoutes from './routes/views-routes/authViewRoutes.js';
import userListViewsRoutes from './routes/views-routes/userListViewsRoutes.js';
import plotListViewsRoutes from './routes/views-routes/plotListViewsRoutes.js';
import rulesViewsRoutes from './routes/views-routes/rulesViewsRoutes.js';
import createPlotViewRoute from './routes/views-routes/createPlotViewRoute.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js'; // Ruta de suscripción

// WebSockets
import http from 'http';

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

app.get("/api/status", (req, res) => {
  res.status(200).json({ message: "API funcionando" });
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar almacenamiento de sesiones con Sequelize
const SequelizeSessionStore = SequelizeStore(session.Store);
const sessionStore = new SequelizeSessionStore({ db: sequelize });
await sessionStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'tu_secreto',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 horas
      httpOnly: true,
      secure: false,
    },
  })
);

// Configura el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configura rutas de API
app.use('/api/plots', plotsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sensors', sensorsRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/sensor_value', sensorValueRoutes);
app.use('/api/actuators', actuatorRoutes);
app.use('/api/rules', rulesRoutes);
app.use('/api/irrigation_schedule', irrigationScheduleRoutes);

// Configura rutas de vistas
app.use('/views/auth', authViewRoutes);
app.use('/views/userList', isAuthenticated, userListViewsRoutes);
app.use('/views/rules', isAuthenticated, rulesViewsRoutes);
app.use('/views/plot-list', isAuthenticated, plotListViewsRoutes);
app.use('/views/create-plot', isAuthenticated, createPlotViewRoute);

// Ruta de suscripción (ya configurada)
app.use('/api/subscriptions', subscriptionRoutes);

// Manejo de errores
app.use((req, res) => res.status(404).send('Página no encontrada'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

// **Configuración de WebSockets**
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('🔵 Cliente WebSocket conectado');

  // Enviar un mensaje de bienvenida al cliente
  ws.send(JSON.stringify({ type: 'welcome', message: '¡Bienvenido al servidor WebSocket!' }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('📩 Mensaje recibido:', data);

      // Enviar el mensaje a todos los clientes conectados
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) { // Usar `client.OPEN`
          client.send(JSON.stringify({ type: 'user_message', data }));
        }
      });
    } catch (error) {
      console.error('❌ Error al procesar el mensaje:', error);
    }
  });

  ws.on('close', () => {
    console.log('🔴 Cliente WebSocket desconectado');
  });

  ws.onerror = (error) => {
    console.error('⚠️ Error en WebSocket:', error);
  };
});

wss.on('error', (error) => {
  console.error('⚠️ Error en el servidor WebSocket:', error);
});

// **Simulación de Notificaciones en Tiempo Real**
setInterval(() => {
  const randomType = Math.floor(Math.random() * 4); // Generar un tipo de notificación aleatorio
  let notification;

  // Según el tipo generado, crea diferentes notificaciones
  switch(randomType) {
    case 0:
      // Alerta de sensor (por ejemplo, temperatura alta)
      notification = {
        type: 'alert',
        message: `Alerta de sensor: Temperatura alta en el sensor ${Math.floor(Math.random() * 100)}`,
      };
      break;
    
    case 1:
      // Notificación informativa (estado del sistema)
      notification = {
        type: 'info',
        message: `Actualización del sistema: El servidor está funcionando correctamente.`,
      };
      break;
    
    case 2:
      // Advertencia (por ejemplo, niveles de humedad)
      notification = {
        type: 'warning',
        message: `Advertencia: Niveles de humedad bajos en la zona ${Math.floor(Math.random() * 5) + 1}`,
      };
      break;

    case 3:
      // Notificación de éxito (acción completada)
      notification = {
        type: 'success',
        message: `Acción exitosa: El sensor fue recalibrado correctamente.`,
      };
      break;
  }

  // Enviar la notificación a todos los clientes conectados
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notification));
    }
  });

  console.log('📢 Notificación enviada:', notification);
}, 3600000); // Se envía una alerta cada hora (3600000 ms)

export default app;
