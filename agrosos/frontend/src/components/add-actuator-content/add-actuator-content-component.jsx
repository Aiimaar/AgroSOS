import React, { useState } from "react";
import "./add-actuator-content-component.css";
import lock from "./icon_lock_locked_.png";

function AddActuatorContentComponent() {
  const [actuatorCode, setActuatorCode] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    if (!actuatorCode.trim()) {
      setErrors("Por favor, ingrese un código válido.");
      return false;
    }
    if (!/^\d+$/.test(actuatorCode)) {
      setErrors("El código debe ser un número.");
      return false;
    }
    setErrors("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage(`Actuador con código "${actuatorCode}" enlazado correctamente.`);
      setActuatorCode("");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div className="container-add-actuator">
      <div className="form-add-actuator">
        <h1 className="form-title">Enlazar actuador</h1>
        <form className="actuator-form" onSubmit={handleSubmit}>
          <div className="form-group-actuator-name">
            <label htmlFor="actuator-name-input" className="label-actuator-name">
              Nombre del actuador
            </label>
            <div className="input-container">
              <input
                type="text"
                id="actuator-name-input"
                className="input-actuator-name"
                value="Nombre del actuador"
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
          </div>
          <button type="submit" className="btn-enla-actuator">
            Enlazar
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default AddActuatorContentComponent;
