import React from "react";
import { Link } from "react-router-dom";
import "./actuator-content-component.css";
import vector from "./Vector.png";
import irrigation from "./image59.png";
import add from "./image50.png";
import quit from "./image51.png";
import nutrition from "./image61.png";
import vent from "./Group1.png";
import { useTranslation } from "react-i18next"; // Importa el hook useTranslation
import { useDarkMode } from '../../context/DarkModeContext';

function ActuatorContentComponent() {
  const { t } = useTranslation(); // Obtén la función de traducción
  const { darkMode } = useDarkMode();

  const actuators = [
    { name: t("irrigation"), img: irrigation, altText: t("irrigation_image") },
    { name: t("ventilation"), img: vent, altText: t("ventilation_image") },
    { name: t("crop_covering"), img: nutrition, altText: t("crop_covering_image") },
    { name: t("window_opening"), img: vector, altText: t("window_opening_image") },
  ];


  return (
    <div id="actuator-container" className={darkMode ? 'dark-mode' : ''}>
      <h2 id="actuator-list" className="sr-only">Lista de actuadores</h2>
      <div className="actuatorList">
        {actuators.map((actuator) => (
          <div className="list" key={actuator.name} role="listitem">
            <img
              src={actuator.img}
              alt={`Imagen de ${actuator.name}`}
              className="actuator-content-component-img"
              aria-hidden="true"
            />
            <p>{actuator.name}</p>
            <div className="actuator-buttons">
              <Link to={`/add-actuator?name=${actuator.name}`} aria-label={`Añadir actuador ${actuator.name}`}>
                <img src={add} alt={t("add_actuator")} className="add" />
              </Link>
              <Link to="/actuator-enla?showDelete=true" aria-label={`Eliminar actuador ${actuator.name}`}>
                <img src={quit} alt={t("delete_actuator")} className="quit" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="enla">
        <Link to="/actuator-enla" aria-label="Ver actuadores enlazados">
          <button className="button-enla">
            <p className="enla-p">{t("linked_actuators")}</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ActuatorContentComponent;
