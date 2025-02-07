import React from 'react';
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

  useEffect(() => {
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
        onClick={() => navigate("/plot-list")}
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
