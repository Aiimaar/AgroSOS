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
    { name: "Riego", img: irrigation },
    { name: "Ventilación", img: vent },
    { name: "Cobertura de cultivos", img: nutrition },
    { name: "Apertura de ventanas", img: vector },
  ];

  return (
    <div id="actuator-container">
      <div className="actuatorList">
        {actuators.map((actuator) => (
          <div className="list" key={actuator.name}>
            <img
              src={actuator.img}
              alt={actuator.name}
              className="actuator-content-component-img"
            />
            <p>{actuator.name}</p>
            <div className="actuator-buttons">
              <Link to={`/add-actuator?name=${actuator.name}`}>
                <img src={add} alt="add" className="add" />
              </Link>
              <Link to="/actuator-enla?showDelete=true">
                {" "}
                <img src={quit} alt="quit" className="quit" />
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
