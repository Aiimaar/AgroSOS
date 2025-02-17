import express from "express";
import * as subscriptions from "../controllers/subscriptionController.js"; // Importa todas las funciones

const router = express.Router();

// Crear nueva suscripción
router.post("/subscribe", subscriptions.create);

// Enviar notificación a una suscripción específica
router.post("/sendNotificationToSubscriptionName", subscriptions.sendNotificationToSubscriptionName);

// Eliminar suscripción por endpoint
router.post("/deleteByEndpoint", subscriptions.deleteByEndpoint);

// Obtener todas las suscripciones
router.get("/", subscriptions.findAll);

export default router;
