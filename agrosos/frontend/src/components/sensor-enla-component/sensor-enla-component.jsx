import React, { useContext } from "react";
import { SensorContext } from "../../context/SensorContext";
import "./sensor-enla-component.css";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SensorEnlaComponent() {
  const { linkedSensors, removeLinkedSensor, showRemoveButtons } = useContext(SensorContext);

  const navigate = useNavigate();

  const typeMappingInverse = {
    "temperature": "Temperatura",
    "humidity": "Humedad",
    "soil_temperature": "Temperatura de terreno",
    "soil_humidity": "Humedad del terreno"
  };

  return (
    <div id="sensor-enla-container">
      <button
        className="sensor-enla-button-arrow"
        onClick={() => navigate("/sensors")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="enla-title">
        Sensores enlazados
      </h1>
      <div className="linked-sensors-list">
        {linkedSensors.length > 0 ? (
          linkedSensors.map((sensor, index) => (
            <div key={index} className="sensor-item">
              <p>
                <strong>Nombre:</strong> {typeMappingInverse[sensor.type] || sensor.type}
              </p>
              <p>
                <strong>Código:</strong> {sensor.code}
              </p>
              {showRemoveButtons && (
                <button
                  className="remove-sensor-btn"
                  onClick={() => removeLinkedSensor(sensor.id)}
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
