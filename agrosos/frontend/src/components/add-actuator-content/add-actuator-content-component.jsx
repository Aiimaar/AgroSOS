import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./add-actuator-content-component.css";
import lock from "./icon_lock_locked_.png";
import { useActuators } from "../../context/ActuatorContext";

function AddActuatorContentComponent() {
  const { selectedActuator, addActuator, errors, tokenError, successMessage, setShowRemoveButtons } = useActuators();
  const [actuatorCode, setActuatorCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addActuator(selectedActuator, actuatorCode);
    setActuatorCode("");
  };

  return (
    <div className="container-add-actuator">
      <div className="form-add-actuator">
        <h1 className="actuator-form-title">Enlazar actuador</h1>
        <form className="actuator-form" onSubmit={handleSubmit}>
          <div className="form-group-actuator-name">
            <label htmlFor="actuator-name-input" className="label-actuator-name">
              Nombre del actuador
            </label>
            <div className="actuator-input-container">
              <input
                type="text"
                id="actuator-name-input"
                className="input-actuator-name"
                value={selectedActuator || "Nombre del actuador"}
                readOnly
              />
              <img src={lock} alt="lock" className="lock-icon" />
            </div>
          </div>
          <div className="form-group-actuator-code">
            <label htmlFor="actuator-code-input" className="label-actuator-code">
              Código del actuador a enlazar
            </label>
            <input
              type="number"
              id="actuator-code-input"
              className="input-actuator-code"
              placeholder="Ingrese el código"
              value={actuatorCode}
              onChange={(e) => setActuatorCode(e.target.value)}
            />
            {errors && <p className="error-message">{errors}</p>}
            {tokenError && <p className="error-message">{tokenError}</p>}
          </div>
          <div className="add-actuator-content-component-button">
            <button type="submit" className="btn-enla-actuator">
              Enlazar
            </button>
            <Link to="/actuators">
              <button className="btn-enla-back">Volver</button>
            </Link>
          </div>
        </form>
        {successMessage && <p className="actuator-success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default AddActuatorContentComponent;
