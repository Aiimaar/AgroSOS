import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import * as plotController from './controllers/plotController.js';
import * as userController from './controllers/userController.js';
import * as sensorController from './controllers/sensorController.js';

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync();

// Rutas para Plots usando el controlador
app.get("/api/plots", plotController.getPlots);
app.post("/api/plots", plotController.createPlot);
app.put("/api/plots/:id", plotController.updatePlot);
app.delete("/api/plots/:id", plotController.deletePlot);

// Rutas para Usuarios
app.get("/users", userController.getUsers);
app.post("/users", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

// Rutas para Sensors
app.get("/api/sensors", sensorController.getSensors);
app.post("/api/sensors", sensorController.createSensor);
app.put("/api/sensors/:id", sensorController.updateSensor);
app.delete("/api/sensors/:id", sensorController.deleteSensor);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
