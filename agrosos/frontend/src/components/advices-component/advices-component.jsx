import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importar useTranslation para internacionalización
import "./advices-component.css";
import { useDarkMode } from '../../context/DarkModeContext';

function AdvicesComponent() {
  const { t } = useTranslation(); // Inicializar useTranslation
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  // Función para manejar el clic en una tarjeta
  const handleCardClick = (path) => {
    navigate(path); // Navegar a la ruta proporcionada
  };

  return (
    <div className={`advices-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="advices-container">
        {/* Botón de retroceso */}
        <button
          className="back-button"
          onClick={() => navigate("/plot-list")}
          aria-label={t("back_button_label")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {/* Header con título */}
        <div className="advices-header">
          <h1 className="advices-title" aria-live="polite">
            <FontAwesomeIcon icon={faLightbulb} className="icon-lightbulb" />
            {t("advice_header_title")}
          </h1>
        </div>

        {/* Tarjetas de Consejos */}
        <div
          className="advices-cards"
          role="region"
          aria-labelledby="advices-cards-title"
        >
          <div
            className="advice-card"
            onClick={() => handleCardClick("/soil-management")}
            role="button"
            aria-label={t("soil_management")}
            tabIndex="0"
          >
            {t("soil_management")}
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/crop-management")}
            role="button"
            aria-label={t("crop_management")}
            tabIndex="0"
          >
            {t("crop_management")}
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/sustainability")}
            role="button"
            aria-label={t("sustainability")}
            tabIndex="0"
          >
            {t("sustainability")}
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/energy-efficiency")}
            role="button"
            aria-label={t("energy_efficiency")}
            tabIndex="0"
          >
            {t("energy_efficiency")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvicesComponent;
