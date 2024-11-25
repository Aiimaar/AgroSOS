import React from "react";
import "./actuator-enla-component.css";
import { useActuators } from "../../context/ActuatorContext";
import { useLocation } from "react-router-dom";

function ActuatorEnlaComponent() {
  const { linkedActuators, deleteActuator } = useActuators();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showDeleteButton = queryParams.get("showDelete") === "true";

  return (
    <div id="actuator-enla-container">
      <h1 className="enla-title">Actuadores enlazados</h1>
      <div className="linked-actuators-list">
        {linkedActuators.length === 0 ? (
          <p>No hay actuadores enlazados.</p>
        ) : (
          <ul>
            {linkedActuators.map((actuator) => (
              <li key={actuator.id}>
                {actuator.name} - Código: {actuator.code}
                {showDeleteButton && (
                  <button
                    onClick={() => deleteActuator(actuator.id)}
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ActuatorEnlaComponent;
