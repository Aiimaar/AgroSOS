import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./efficiency-energy-component.css";
import { useTranslation } from 'react-i18next'; // Asegúrate de tener configurado i18n

function EfficiencyEnergyComponent() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usar el hook para traducir textos

  return (
    <>
      <button
        className="efficiency-back-button"
        onClick={() => navigate("/advices")}
        aria-label={t('back_to_advices')} // Traducción
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="efficiency-energy-container" aria-labelledby="efficiency-header">
        <div className="efficiency-energy-header">
          <h2 id="efficiency-header">{t('efficiency_energy')}</h2> {/* Traducción */}
        </div>
        <div className="efficiency-energy-txt" role="document">
          <h3>{t('renewable_energy')}</h3> {/* Traducción */}
          <p>{t('renewable_energy_description')}</p> {/* Traducción */}

          <h3>{t('energy_optimization')}</h3> {/* Traducción */}
          <p>{t('energy_optimization_description')}</p> {/* Traducción */}
        </div>
      </div>
    </>
  );
}

export default EfficiencyEnergyComponent;
