import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importamos useTranslation
import "./crops-menu-component.css";

const CropsMenuComponent = () => {
  const { t } = useTranslation(); // Usamos el hook para la traducción

  return (
    <div className="crops-menu">
      <h1 className="crops-menu-title">{t('plot_name', { plot: 'Terreno 1' })}</h1>
      <div className="crops-menu-buttons" role="navigation" aria-label={t('navigation_menu')}>
        <Link to="/crops">
          <button 
            className="crops-menu-button active" 
            aria-label={t('view_crop', { plot: 'Terreno 1' })}
          >
            <img src="cultivo-icon.png" alt={t('crop_icon_alt')} className="button-icon" />
            {t('crop')}
          </button>
        </Link>
        <Link to="/sensors">
          <button 
            className="crops-menu-button" 
            aria-label={t('view_sensors', { plot: 'Terreno 1' })}
          >
            <img src="sensores-icon.png" alt={t('sensors_icon_alt')} className="button-icon" />
            {t('sensors')}
          </button>
        </Link>
        <Link to="/actuators">
          <button 
            className="crops-menu-button" 
            aria-label={t('view_actuators', { plot: 'Terreno 1' })}
          >
            <img src="actuadores-icon.png" alt={t('actuators_icon_alt')} className="button-icon" />
            {t('actuators')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CropsMenuComponent;
