import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { useTranslation } from "react-i18next";
import { useWebSocket } from "../../context/WebSocketContext";
import React, { useEffect, useState } from "react";
import "./notifications-component.css";

function NotificationsComponent() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const { messages } = useWebSocket(); 

  const [notifications, setNotifications] = useState([]);

  // Manejar las notificaciones entrantes de WebSocket y WebPush
  useEffect(() => {
    // Primero, manejamos las notificaciones de WebSocket
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1];

      let parsedMessage;
      try {
        parsedMessage = typeof newMessage === "string" ? JSON.parse(newMessage) : newMessage;
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
        return;
      }

      const notificationType = parsedMessage?.type || "alert";
      const notificationMessage = parsedMessage?.message || "No se recibió mensaje";

      const notification = {
        type: notificationType,
        message: notificationMessage,
      };

      setNotifications((prevNotifications) => {
        const isDuplicate = prevNotifications.some(
          (existingNotification) =>
            existingNotification.message === notification.message
        );

        if (!isDuplicate) {
          return [...prevNotifications, notification];
        } else {
          return prevNotifications;
        }
      });
    }

    // También debemos manejar las notificaciones push (WebPush) si es necesario
    // Si la notificación viene de un service worker o WebPush
    const handlePushNotification = (event) => {
      const data = event.data ? event.data.json() : {};

      const title = data.title || "Notificación";
      const body = data.body || "Tienes una nueva notificación.";

      const notification = {
        type: "push",
        message: body,
      };

      setNotifications((prevNotifications) => {
        const isDuplicate = prevNotifications.some(
          (existingNotification) =>
            existingNotification.message === notification.message
        );

        if (!isDuplicate) {
          return [...prevNotifications, notification];
        } else {
          return prevNotifications;
        }
      });
    };

    // Registra el evento de Push en el service worker
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('push', handlePushNotification);
    }

    return () => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.removeEventListener('push', handlePushNotification);
      }
    };
  }, [messages]);

  const handleNotificationClick = (message) => {
    setNotifications((prevNotifications) => 
      prevNotifications.map((notification) =>
        notification.message === message
          ? { ...notification, isDisappearing: true }
          : notification
      )
    );

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.message !== message)
      );
    }, 500);
  };

  return (
    <div id="notifications-component-container" className={darkMode ? 'dark-mode' : ''}>
      <button
        className="notifications-component-button-arrow"
        onClick={() => navigate("/settings")}
        aria-label={t("back_to_plot_list")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="notifications-component-h1">{t("notifications")}</h1>

      {notifications.length === 0 ? (
        <p>No hay notificaciones</p>
      ) : (
        notifications.map((notification, index) => {
          const notificationClass = notification.type || "alert";
          return (
            <div 
              key={index} 
              className={`notifications-component-notification ${notificationClass} ${notification.isDisappearing ? 'fade-out' : ''}`} 
              onClick={() => handleNotificationClick(notification.message)}
            >
              <div className="notification-content">
                <p className="notifications-component-p">
                  <strong>{notification.message}</strong>
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default NotificationsComponent;
