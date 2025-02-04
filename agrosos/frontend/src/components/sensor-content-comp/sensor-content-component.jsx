import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importamos el hook useTranslation
import "./sensor-content-component.css";
import airTemp from "./image58.png";
import airHu from "./image57.png";
import plotTemp from "./Hydroponics.png";
import plotHu from "./image56.png";
import add from "./image50.png";
import quit from "./image51.png";
import { useDarkMode } from '../../context/DarkModeContext'; // Contexto de modo oscuro

function Sensors() {
    const [showRemoveButtons, setShowRemoveButtons] = useState(false);
    const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto
    const { t, i18n } = useTranslation(); // Hook de traducción

    // Obtener idioma desde localStorage
    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") || "es"; // Usa español como fallback
        i18n.changeLanguage(storedLanguage);
    }, [i18n]);

    const sensors = [
        { name: t("temperature"), img: airTemp, altText: t("temperature_sensor") },
        { name: t("humidity"), img: airHu, altText: t("humidity_sensor") },
        { name: t("soilTemperature"), img: plotTemp, altText: t("soil_temperature_sensor") },
        { name: t("soilHumidity"), img: plotHu, altText: t("soil_humidity_sensor") },
    ];

    const handleSensorsLinkedClick = () => {
        setShowRemoveButtons(false);
    };

    return (
        <div id="sensor-content-container" className={darkMode ? 'dark-mode' : ''}>
            <div className="sensorList" role="list" aria-label="Lista de sensores">
                {sensors.map((sensor) => (
                    <div className="sensor-content-list" key={sensor.name} role="listitem">
                        <img src={sensor.img} alt={sensor.altText} className="sensor-img" />
                        <p>{sensor.name}</p>
                        <div className="sensor-content-buttons">
                            <Link to={`/add-sensor?name=${sensor.name}`} aria-label={t("add_sensor", { name: sensor.name })}>
                                <img src={add} alt={t("add")} className="add" />
                            </Link>
                            <Link to="/sensor-enla?showDelete=true" aria-label={t("remove_sensor", { name: sensor.name })}>
                                <img src={quit} alt={t("remove")} className="quit" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="enla">
                <Link to="/sensor-enla">
                    <button className="button-enla" aria-label={t("linked_sensors")}>
                        <p className="enla-p">{t("linked_sensors")}</p>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Sensors;
