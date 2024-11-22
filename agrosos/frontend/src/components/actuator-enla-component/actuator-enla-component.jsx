import React, { useState } from "react";
import "./actuator-enla-component.css";

function ActuatorEnlaComponent() {
  // Simulación inicial de actuadores enlazados
  const [linkedActuators, setLinkedActuators] = useState([
    { id: 1, name: "Actuador de riego", code: "12345" },
    { id: 2, name: "Actuador de fertilización", code: "67890" },
  ]);

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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ActuatorEnlaComponent;
