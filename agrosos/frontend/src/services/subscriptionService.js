import axios from 'axios';

const API = 'http://localhost:3000/api/subscriptions';
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

async function regSw() {
  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
    return reg;
  }
  throw new Error("serviceworker not supported");
}

async function subscribe(serviceWorkerReg, subscriptionName) {
  try {
    console.log("🔑 Clave Pública en Frontend:", import.meta.env.VITE_PUBLIC_KEY);

    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
      });
    }

    console.log("🚀 Enviando suscripción al backend:", {
      subscriptionName,
      subscription,
    });

    const response = await axios.post(`${API}/subscribe`, { subscriptionName, subscription });
    
    console.log("✅ Respuesta del backend:", response.data);
  } catch (error) {
    console.error("❌ Error al suscribirse:", error.response ? error.response.data : error);
  }
}


function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export { regSw, subscribe };
