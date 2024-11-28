import React, { useContext, useState } from "react";
import { SensorContext } from "../../context/SensorContext";
import SensorHeader from "../sensor-header-comp/sensor-header-component";
import "./add-sensor-content-component.css";
import lock from "./icon_lock_locked_.png";

function AddSensor() {
  const { selectedSensor, addLinkedSensor } = useContext(SensorContext);
  const [sensorCode, setSensorCode] = useState("");
  const [errors, setErrors] = useState({ sensorCode: "" }); // Estado para los errores
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Validar código del sensor (debe ser un número válido y no vacío)
    if (!sensorCode.trim()) {
      newErrors.sensorCode = "Por favor, ingrese un código válido.";
    } else if (!/^\d+$/.test(sensorCode)) {
      newErrors.sensorCode = "El código debe ser un número.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, es válido
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Guardar el sensor enlazado en el contexto
      addLinkedSensor({ name: selectedSensor, code: sensorCode });

      // Mostrar el mensaje de éxito
      setSuccessMessage(`El sensor "${selectedSensor}" con código "${sensorCode}" ha sido enlazado correctamente.`);
      setSensorCode(""); // Limpiar el campo de código
      setTimeout(() => setSuccessMessage(""), 5000); // Ocultar el mensaje después de 5 segundos
    }
  };

  return (
    <div className="container-add-sensor">
      <div className="form-add-sensor">
        <h1 className="sensor-form-title">Enlazar sensor</h1>
        <form className="sensor-form" onSubmit={handleSubmit}>
          <div className="form-group-sensor-name">
            <label htmlFor="sensor-name-input" className="label-sensor-name">
              Nombre del sensor
            </label>
            <div className="sensor-input-container">
              <input
                type="text"
                id="sensor-name-input"
                className="input-sensor-name"
                value={selectedSensor}
                readOnly
              />
              <img src={lock} alt="lock" className="lock-icon" />
            </div>
          </div>
          <div className="form-group-sensor-code">
            <label htmlFor="sensor-code-input" className="label-sensor-code">
              Código del sensor a enlazar
            </label>
            <input
              type="number"
              id="sensor-code-input"
              className="input-sensor-code"
              placeholder="Ingrese el código"
              value={sensorCode}
              onChange={(e) => setSensorCode(e.target.value)}
            />
            {/* Mostrar error debajo del campo si existe */}
            {errors.sensorCode && <p className="sensor-error-message">{errors.sensorCode}</p>}
          </div>
          <button type="submit" className="btn-enla">
            Enlazar
          </button>
        </form>

        {/* Mensaje de éxito */}
        {successMessage && <p className="sensor-success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default AddSensor;
