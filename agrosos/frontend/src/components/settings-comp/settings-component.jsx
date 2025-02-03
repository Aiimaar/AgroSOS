import React, { useEffect, useState } from "react";
import "./settings-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDarkMode } from '../../context/DarkModeContext';

function SettingsComponent() {
  const { t, i18n } = useTranslation();  
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");  // Obtener el role del localStorage
  const { darkMode } = useDarkMode();  // Usar el modo oscuro desde el contexto
  const navigate = useNavigate();

  // Recuperar el idioma preferido desde localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language"); // Obtener idioma desde localStorage

    if (savedLanguage) {
      console.log("Idioma recuperado desde localStorage:", savedLanguage); // Log de idioma
      i18n.changeLanguage(savedLanguage); // Cambiar el idioma de la aplicación
    } else {
      console.log("No se encontró idioma en localStorage, usando idioma por defecto.");
      i18n.changeLanguage("es"); // Si no hay idioma guardado, usar español por defecto
    }

    setLoading(false); // Ya no es necesario esperar por una solicitud al servidor
  }, [i18n]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div id="container-settings" className={darkMode ? 'dark-mode' : ''}>
      <button className="settings-arrow-container" onClick={() => navigate("/plot-list")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
        
      <h1 className="settings-text">{t("settings")}</h1>
      <div className="settings-container-elements">
        <Link to="/notifications" aria-label={t("go_to_alerts_notifications")}>
          <div className="settings-noti">
            <p className="settings-p">{t("alerts_notifications")}</p>
          </div>
        </Link>

        <div className="settings-export" role="region" aria-labelledby="export-settings-title">
          <p id="export-settings-title" className="settings-p">{t("export_land")}</p>
          <div className="settings-ex" aria-label={t("export_options")}>
            <p className="settings-subp">{t("csv")}</p>
            <p className="settings-sub">|</p>
            <p className="settings-subp">{t("excel")}</p>
          </div>
        </div>

        <div className="settings-actu" role="button" tabIndex="0" aria-label={t("check_updates")}>
          <p className="settings-p">{t("check_updates")}</p>
        </div>

        <div className="settings-help" role="button" tabIndex="0" aria-label={t("help_support")}>
          <p className="settings-p">{t("help_support")}</p>
        </div>

        {/* Mostrar "Reglas" solo para Technician y Admin */}
        {role === "Technician" || role === "Admin" ? (
          <div className="settings-rules">
            <Link to="/rules" aria-label={t("go_to_rules")}>
              <p className="settings-p">{t("rules")}</p>
            </Link>
          </div>
        ) : null}

        {/* Mostrar "Lista de usuarios" solo para Admin */}
        {role === "Admin" ? (
          <div className="settings-userc">
            <Link to="/admin-user-crud" aria-label={t("go_to_user_list")}>
              <p className="settings-p">{t("user_list")}</p>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SettingsComponent;
