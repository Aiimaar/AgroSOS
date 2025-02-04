import React from "react";
import { useTranslation } from "react-i18next"; // Importamos el hook useTranslation
import "./crops-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";

function CropsHeaderComponent() {
  const { t } = useTranslation(); // Usamos el hook para la traducción

  return (
    <div className="headerGrey" role="navigation" aria-label={t("navigation_label")}>
      <div className="headerGreyItemContainer">
        <Link 
          to="/inside-a-plot"
          aria-label={t("go_to_crop_page")} // Traducción del label del enlace
        >
          <img 
            src={headerGreyBold} 
            alt={t("crop_image_alt2")} // Descripción traducida de la imagen
            className="headerGreyItem" 
          />
        </Link>
        <p className="header-p">{t("crop")}</p> {/* Traducción de "Cultivo" */}
      </div>
      <div className="headerGreyItemContainer">
        <Link 
          to="/sensors"
          aria-label={t("go_to_sensors_page")} // Traducción del label del enlace
        >
          <img
            src={headerGrey}
            alt={t("sensors_image_alt")} // Descripción traducida de la imagen
            className="headerGreyBoldItem"
          />
        </Link>
        <p className="header-p">{t("sensors3")}</p> {/* Traducción de "Sensores" */}
      </div>
      <div className="headerGreyItemContainer">
        <Link  
          to="/actuators"
          aria-label={t("go_to_actuators_page")} // Traducción del label del enlace
        >
          <img 
            src={headerGrey} 
            alt={t("actuators_image_alt")} // Descripción traducida de la imagen
            className="headerGreyItem" 
          />
        </Link>
        <p className="header-p">{t("actuators3")}</p> {/* Traducción de "Actuadores" */}
      </div>
    </div>
  );
}

export default CropsHeaderComponent;
