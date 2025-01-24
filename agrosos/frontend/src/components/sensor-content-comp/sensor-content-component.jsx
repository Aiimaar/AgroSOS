import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importa el hook useTranslation
import "./sensor-content-component.css";
import airTemp from "./image58.png";
import airHu from "./image57.png";
import plotTemp from "./Hydroponics.png";
import plotHu from "./image56.png";
import add from "./image50.png";
import quit from "./image51.png";

function Sensors() {
  const { t } = useTranslation();  // Usamos useTranslation para obtener la función t

  const sensors = [
    { name: t("temperature"), img: airTemp, altText: t("temperature_sensor") },
    { name: t("humidity"), img: airHu, altText: t("humidity_sensor") },
    { name: t("soilTemperature"), img: plotTemp, altText: t("soil_temperature_sensor") },
    { name: t("soilHumidity"), img: plotHu, altText: t("soil_humidity_sensor") },
  ];

  return (
    <div id="sensor-content-container">
      <div className="sensorList">
        {sensors.map((sensor) => (
          <div className="sensor-content-list" key={sensor.name}>
            <img
              src={sensor.img}
              alt={sensor.altText}
              className={`${sensor.name.toLowerCase().replace(" ", "")}`}
            />
            <p>{sensor.name}</p>
            <div className="sensor-content-buttons">
              <Link to={`/add-sensor?name=${encodeURIComponent(sensor.name)}`}>
                <img src={add} alt={t("add_sensor")} className="add" />
              </Link>
              <Link to="/sensor-enla?showDelete=true">
                <img src={quit} alt={t("remove_sensor")} className="quit" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="enla">
        <Link to="/sensor-enla">
          <button className="button-enla">
            <p className="enla-p">{t("linked_sensors")}</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sensors;
