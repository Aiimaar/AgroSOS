import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./efficiency-energy-component.css";
import { useTranslation } from 'react-i18next';
import { useDarkMode } from "../../context/DarkModeContext"; // Importa useDarkMode

function EfficiencyEnergyComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { darkMode } = useDarkMode(); // Obtiene el estado darkMode

    return (
        <div className={darkMode ? 'dark-mode' : ''}> {/* Aplica la clase dark-mode */}
            <button
                className="efficiency-back-button"
                onClick={() => navigate("/advices")}
                aria-label={t('back_to_advices')}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <div className="efficiency-energy-container" aria-labelledby="efficiency-header">
                <div className="efficiency-energy-header">
                    <h2 id="efficiency-header">{t('efficiency_energy')}</h2>
                </div>
                <div className="efficiency-energy-txt" role="document">
                    <h3>{t('renewable_energy')}</h3>
                    <p>{t('renewable_energy_description')}</p>

                    <h3>{t('energy_optimization')}</h3>
                    <p>{t('energy_optimization_description')}</p>
                </div>
            </div>
        </div>
    );
}

export default EfficiencyEnergyComponent;