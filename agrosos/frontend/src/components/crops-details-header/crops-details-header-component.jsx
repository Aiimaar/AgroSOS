import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importamos el hook useTranslation
import graficaAjo from "./images/grafica-ajo.png";
import ajo from "./images/ajo.png";
import "./crops-details-header-component.css";

const CropsDetailsHeaderComponent = ({ cropImage = ajo, onBack }) => {
  const { t, i18n } = useTranslation(); // Usamos el hook para la traducción
  const navigate = useNavigate(); // Define navigate

  useEffect(() => {
    // Recuperamos el idioma del localStorage
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    } else {
      i18n.changeLanguage("es"); // Idioma por defecto: Español
    }
  }, [i18n]);

  return (
    <div className="crops-header">
      <button
        className="crop-details-back-button"
        onClick={onBack || (() => navigate("/advices"))} // Usa onBack si está definido, de lo contrario navigate
        aria-label={t("back_button")} // Traducción del botón
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="crop-info">
        <div className="crop-image-container">
          <img
            src={cropImage}
            alt={t("crop_image_alt")} // Descripción traducida de la imagen del cultivo
            className="crop-image"
            aria-describedby="crop-title" // Relaciona la imagen con el título del cultivo
          />
        </div>
        <h1 className="crop-title" id="crop-title">
          {t("crop_title")} {/* Título traducido */}
        </h1>
        <div className="chart-image-container">
          <img
            src={graficaAjo}
            alt={t("chart_image_alt")} // Descripción traducida de la gráfica
            className="chart-image"
            aria-labelledby="crop-title" // Relaciona la gráfica con el título del cultivo
          />
        </div>
      </div>
    </div>
  );
};

export default CropsDetailsHeaderComponent;
