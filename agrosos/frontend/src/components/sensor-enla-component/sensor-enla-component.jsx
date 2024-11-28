import React, { useContext, useState } from "react";
import { SensorContext } from "../../context/SensorContext";
import "./sensor-enla-component.css";

function SensorEnlaComponent() {
  const { linkedSensors, removeLinkedSensor } = useContext(SensorContext);
  const [showRemoveButtons, setShowRemoveButtons] = useState(false); // Controla la visibilidad de los botones "Eliminar"

  const handleShowButtons = () => {
    setShowRemoveButtons(true); // Mostrar los botones al hacer clic
  };

  return (
    <div id="sensor-enla-container">
      <h1 className="enla-title" onClick={handleShowButtons}>
        Sensores enlazados
      </h1>
      <div className="linked-sensors-list">
        {linkedSensors.length > 0 ? (
          linkedSensors.map((sensor, index) => (
            <div key={index} className="sensor-item">
              <p>
                <strong>Nombre:</strong> {sensor.name}
              </p>
              <p>
                <strong>Código:</strong> {sensor.code}
              </p>
              {/* Mostrar el botón solo si "showRemoveButtons" es true */}
              {showRemoveButtons && (
                <button
                  className="remove-sensor-btn"
                  onClick={() => removeLinkedSensor(sensor.id)} // Se pasa el id para eliminarlo
                >
                  Eliminar
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-sensors-message">No hay sensores enlazados.</p>
        )}
      </div>
    </div>
  );
}

export default SensorEnlaComponent;
