import React, { useEffect } from "react";
import "./actuator-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../context/DarkModeContext"; 

function ActuatorHeaderComponent() {
  const { darkMode } = useDarkMode();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "es";
    console.log("Idioma obtenido del localStorage:", storedLanguage); 
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  return (
    <div id="actuator-header-container" className={darkMode ? "dark-mode" : ""}>
      <div className="headerGrey">
        <div className="headerGreyItemContainer">
          <Link to="/crops" aria-label={t("go_to_crops2")}>
            <img src={headerGrey} alt={t("crops_image_alt2")} className="headerGreyItem" />
          </Link>
          <p className="header-p">{t("crops2")}</p>
        </div>
        <div className="headerGreyItemContainer">
          <Link to="/sensors" aria-label={t("go_to_sensors2")}>
            <img src={headerGrey} alt={t("sensors_image_alt2")} className="headerGreyBoldItem" />
          </Link>
          <p className="header-p">{t("sensors2")}</p>
        </div>
        <div className="headerGreyItemContainer">
          <Link to="/inside-a-plot" aria-label={t("go_to_actuators2")}>
            <img src={headerGreyBold} alt={t("actuators_image_alt2")} className="headerGreyItem" />
          </Link>
          <p className="header-p">{t("actuators2")}</p>
        </div>
      </div>
    </div>
  );
}

export default ActuatorHeaderComponent;
