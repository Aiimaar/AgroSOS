import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de que la ruta es correcta
import "./soil-management-component.css";

function SoilManagementComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { darkMode } = useDarkMode(); // Solo obtenemos el estado, no la función

    return (
        <div className={darkMode ? 'dark-mode' : ''}> {/* Aplicar dark-mode al contenedor principal */}
            <button
                className="soil-back-button"
                onClick={() => navigate("/advices")}
                aria-label={t("back_to_advices")}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <div
                className="soil-management-container"
                role="main"
                aria-labelledby="soil-management-title"
            >
                <div className="soil-management-header">
                    <h2 id="soil-management-title">{t("soil_management")}</h2>
                </div>

                <div
                    className="soil-management-txt"
                    role="article"
                    aria-labelledby="soil-management-instructions"
                >
                    <p id="soil-management-instructions" className="visually-hidden">
                        {t("soil_management_instructions")}
                    </p>

                    <section aria-labelledby="soil-test-title">
                        <h3 id="soil-test-title">{t("soil_tests")}</h3>
                        <p>{t("soil_tests_description")}</p>
                    </section>

                    <section aria-labelledby="crop-rotation-title">
                        <h3 id="crop-rotation-title">{t("crop_rotation")}</h3>
                        <p>{t("crop_rotation_description")}</p>
                    </section>

                    <section aria-labelledby="fertilization-title">
                        <h3 id="fertilization-title">{t("fertilization")}</h3>
                        <p>{t("fertilization_description")}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default SoilManagementComponent;