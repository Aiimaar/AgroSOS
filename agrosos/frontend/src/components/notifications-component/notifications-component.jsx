import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import alert from "./Ellipse17.png";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { useTranslation } from "react-i18next"; // Importamos useTranslation para manejar los textos traducidos
import "./notifications-component.css";

function NotificationsComponent() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto
  const { t } = useTranslation(); // Función de traducción

  return (
    <div
      id="notifications-component-container"
      className={darkMode ? "dark-mode" : ""}
    >
      <button
        className="notifications-component-button-arrow"
        onClick={() => navigate("/plot-list")}
        aria-label={t("back_to_plot_list")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="notifications-component-h1">{t("notifications")}</h1>

      <div className="notifications-component-notification">
        <img
          src={alert}
          alt={t("alert_temperature_over_30")}
          className="notifications-component-notification-alert"
        />
        <p className="notifications-component-p">{t("temperature_over_30")}</p>
      </div>

      <div className="notifications-component-notification">
        <img
          src={alert}
          alt={t("alert_humidity_below_20")}
          className="notifications-component-notification-alert"
        />
        <p className="notifications-component-p">{t("humidity_below_20")}</p>
      </div>

      <div className="notifications-component-notification">
        <p className="notifications-component-p">{t("soil_is_very_wet")}</p>
      </div>

      <div className="notifications-component-notification">
        <p className="notifications-component-p">
          {t("temperature_dropped_dangerously")}
        </p>
      </div>

      <div className="notifications-component-notification">
        <p className="notifications-component-p">{t("low_air_temperature")}</p>
      </div>
    </div>
  );
}

export default NotificationsComponent;
