import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../context/DarkModeContext"; // Importa useDarkMode
import "./sustainability-and-environment-component.css";

function SustainabilityAndEnvironmentComponent() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { darkMode } = useDarkMode(); // Obtiene el estado darkMode

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") || "es"; // Español por defecto
        i18n.changeLanguage(storedLanguage);
    }, [i18n]);

    return (
        <div className={darkMode ? 'dark-mode' : ''}> {/* Aplica la clase dark-mode */}
            <button
                className="sustainability-back-button"
                onClick={() => navigate("/advices")}
                aria-label={t("back_to_advices")}
            >
                <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            </button>
            <div className="sustainability-container">
                <div className="sustainability-header">
                    <h2 id="sustainability-header">{t("sustainability_title")}</h2>
                </div>

                <div className="sustainability-txt">
                    <h3 id="conservation" tabIndex="0">{t("conservation_title")}</h3>
                    <p>{t("conservation_text")}</p>

                    <h3 id="organic-farming" tabIndex="0">{t("organic_farming_title")}</h3>
                    <p>{t("organic_farming_text")}</p>

                    <h3 id="waste_management" tabIndex="0">{t("waste_management_title")}</h3>
                    <p>{t("waste_management_text")}</p>
                </div>
            </div>
        </div>
    );
}

export default SustainabilityAndEnvironmentComponent;