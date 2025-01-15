import React from "react";
import { Link } from "react-router-dom";
import "./actuator-content-component.css";
import vector from "./Vector.png";
import irrigation from "./image59.png";
import add from "./image50.png";
import quit from "./image51.png";
import nutrition from "./image61.png";
import vent from "./Group1.png";

function ActuatorContentComponent() {
  const actuators = [
    { name: "Riego", img: irrigation, altText: "Imagen de sistema de riego" },
    { name: "Ventilación", img: vent, altText: "Imagen de ventilación del invernadero" },
    { name: "Cobertura de cultivos", img: nutrition, altText: "Imagen de cobertura de cultivos" },
    { name: "Apertura de ventanas", img: vector, altText: "Imagen de apertura de ventanas" },
  ];

  return (
    <div id="actuator-container">
      <div className="actuatorList">
        {actuators.map((actuator) => (
          <div className="list" key={actuator.name}>
            <img
              src={actuator.img}
              alt={actuator.altText}
              className="actuator-content-component-img"
            />
            <p>{actuator.name}</p>
            <div className="actuator-buttons">
              <Link to={`/add-actuator?name=${actuator.name}`}>
                <img src={add} alt="Añadir actuador" className="add" />
              </Link>
              <Link to="/actuator-enla?showDelete=true">
                <img src={quit} alt="Eliminar actuador" className="quit" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="enla">
        <Link to="/actuator-enla">
          <button className="button-enla">
            <p className="enla-p">Actuadores enlazados</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ActuatorContentComponent;
