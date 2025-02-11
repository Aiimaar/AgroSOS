// self.addEventListener('push', function (event) {
//     const data = event.data ? event.data.json() : {};
//     const title = data.title || 'Notificación';
//     const options = {
//       body: data.description || 'Tienes una nueva notificación.',
//     };
  
//     event.waitUntil(
//       self.registration.showNotification(title, options)
//     );
//   });
  
//   self.addEventListener('notificationclick', function (event) {
//     event.notification.close();
//     event.waitUntil(
//       clients.openWindow('/notifications') // Redirigir cuando se haga clic en la notificación
//     );
//   });
  
this.addEventListener('push', async function (event) {
  console.log("📲 Notificación recibida...");

  // Asegúrate de que el mensaje esté en el formato correcto
  const message = await event.data.json(); // Convierte el payload JSON a objeto JS

  console.log("🎯 Datos de la notificación:", message); // Muestra lo que se recibe

  // Asegúrate de que 'title', 'description' y 'image' existen en el payload
  const { title, description, image } = message;

  await event.waitUntil(
    this.registration.showNotification(title, {
      body: description,         // Descripción (cuerpo de la notificación)
      icon: image,                // Ícono (imagen de la notificación)
      badge: '/path/to/badge.png', // (opcional) Badge para la notificación
      actions: [
        {
          action: "open",        // Acción (opcional)
          title: "Ver Notificación", 
          icon: '/path/to/action-icon.png', 
        }
      ],
    })
  );
});

