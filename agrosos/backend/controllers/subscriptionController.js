import Subscription from '../models/subscriptionModel.js'; // Ajusta la ruta según tu estructura
import webPush from 'web-push';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

console.log("🔑 Clave Pública en Backend:", process.env.PUBLIC_KEY);
console.log("🔐 Clave Privada en Backend:", process.env.PRIVATE_KEY);

// Configurar las claves VAPID correctamente
webPush.setVapidDetails(
  'mailto:myemail@example.com',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

// Crear una nueva suscripción
export const create = async (req, res) => {
  try {
    const { subscription, subscriptionName } = req.body;

    console.log("📝 Datos recibidos en el backend:", req.body);

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ message: "Faltan datos de suscripción" });
    }

    const newSubscription = await Subscription.create({
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: JSON.stringify(subscription.keys),
      subscriptionName
    });

    console.log("✅ Suscripción guardada en la base de datos:", newSubscription);

    res.status(201).json({ message: "Suscripción creada", subscription: newSubscription });
  } catch (error) {
    console.error("❌ Error al crear suscripción:", error);
    res.status(500).json({ message: "Error al crear suscripción", error });
  }
};

// Obtener todas las suscripciones
export const findAll = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll();
    console.log("Suscripciones en DB:", subscriptions);
    res.json(subscriptions);
  } catch (error) {
    console.error("Error al obtener suscripciones:", error);
    res.status(500).json({ message: "Error al obtener suscripciones", error });
  }
};

// Enviar notificación a todos los suscriptores
export const sendNotificationToSubscriptionName = async () => {
  try {
    const subscriptions = await Subscription.findAll();

    if (subscriptions.length === 0) {
      console.log("⚠️ No hay suscriptores para enviar notificaciones.");
      return;  // O simplemente salir sin hacer nada
    }

    console.log(`📢 Enviando notificaciones a ${subscriptions.length} suscriptores...`);

    const title = "📢 Notificación Automática";
    const description = "¡Hola! Esta es una notificación enviada automáticamente.";
    const image = "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg";

    for (const subscription of subscriptions) {
      await sendNotification(subscription, title, description, image);
    }

    console.log("✅ Notificaciones enviadas con éxito.");
  } catch (error) {
    console.error("❌ Error al enviar notificaciones automáticas:", error);
  }
};


// Eliminar una suscripción por endpoint
export const deleteByEndpoint = async (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ message: "Falta el endpoint" });
    }

    console.log("Buscando suscripción para eliminar:", endpoint);

    const subscriptionToDelete = await Subscription.findOne({ where: { endpoint } });

    if (!subscriptionToDelete) {
      return res.status(404).json({ message: "Endpoint no encontrado" });
    }

    await Subscription.destroy({ where: { id: subscriptionToDelete.id } });

    console.log("🗑️ Suscripción eliminada:", subscriptionToDelete);

    // Notificar a los demás suscriptores
    const subscriptionsInDB = await Subscription.findAll();
    for (const s of subscriptionsInDB) {
      await sendNotification(
        s,
        "🔔 Suscripción Eliminada",
        `Se eliminó una suscripción a ${subscriptionToDelete.subscriptionName}`
      );
    }

    res.json({ message: "Suscripción eliminada" });
  } catch (error) {
    console.error("❌ Error al eliminar suscripción:", error);
    res.status(500).json({ message: "Error al eliminar suscripción", error });
  }
};

// Función auxiliar para enviar notificaciones
const sendNotification = async (subscription, title, description, image) => {
  try {
    const subscriptionData = {
      endpoint: subscription.endpoint,
      expirationTime: subscription.expirationTime,
      keys: JSON.parse(subscription.keys),
    };

    const payload = JSON.stringify({ title, description, image });

    await webPush.sendNotification(subscriptionData, payload);
    console.log(`✅ Notificación enviada a ${subscription.endpoint}`);
  } catch (error) {
    console.error("❌ Error al enviar notificación:", error);
  }
};
