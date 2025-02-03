import React, { useEffect } from "react";
import "./header-grey-component.css";
import headerGrey from "./image.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importamos useTranslation

function SensorHeaderGrey() {
    const { t, i18n } = useTranslation(); // Hook de traducción

    // Obtener idioma desde localStorage y aplicarlo a i18n
    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") || "es"; // Español por defecto
        i18n.changeLanguage(storedLanguage);
    }, [i18n]);

    return (
        <div className="headerGrey-inside-a-plot" role="region" aria-label={t("sensor_options")}>
            <div className="headerGreyItemContainer">
                <Link to="/crops" aria-label={t("go_to_crops")}>
                    <img src={headerGrey} alt={t("crops_image_alt")} className="headerGreyItem" />
                </Link>
                <p className="header-p">{t("crops")}</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/sensors" aria-label={t("go_to_sensors")}>
                    <img src={headerGrey} alt={t("sensors_image_alt")} className="headerGreyItem" />
                </Link>
                <p className="header-p">{t("sensors")}</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/actuators" aria-label={t("go_to_actuators")}>
                    <img src={headerGrey} alt={t("actuators_image_alt")} className="headerGreyItem" />
                </Link>
                <p className="header-p">{t("actuators")}</p>
            </div>
        </div>
    );
}

export default SensorHeaderGrey;
