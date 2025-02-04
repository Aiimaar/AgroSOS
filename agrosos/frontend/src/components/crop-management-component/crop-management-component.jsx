import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importamos el hook useTranslation
import "./crop-management-component.css";

function CropManagementComponent() {
  const { t, i18n } = useTranslation(); // Usamos el hook para la traducción
  const navigate = useNavigate();

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
    <>
      <button
        className="crop-management-back-button"
        onClick={() => navigate("/advices")}
        aria-label={t("back_button")} // Traducción del botón
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="crop-management-container">
        <div className="crop-management-header">
          <h2 id="header-crop-management">{t("header_title")}</h2> {/* Título traducido */}
        </div>

        <div className="crop-management-txt">
          <h3 id="section-selection">{t("section_selection")}</h3> {/* Título sección 1 */}
          <p>{t("selection_text")}</p> {/* Descripción sección 1 */}

          <h3 id="section-irrigation">{t("section_irrigation")}</h3>
          <p>{t("irrigation_text")}</p>

          <h3 id="section-pest-control">{t("section_pest_control")}</h3>
          <p>{t("pest_control_text")}</p>
        </div>
      </div>
    </>
  );
}

export default CropManagementComponent;
