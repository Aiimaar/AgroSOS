import React, { useContext, useState } from "react";
import { SensorContext } from "../../context/SensorContext";
import { Link } from "react-router-dom";
import "./add-sensor-content-component.css";
import lock from "./icon_lock_locked_.png";

function AddSensor() {
  const { selectedSensor, addLinkedSensor } = useContext(SensorContext);
  const [sensorCode, setSensorCode] = useState("");
  const [errors, setErrors] = useState({ sensorCode: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!sensorCode.trim()) {
      newErrors.sensorCode = "Por favor, ingrese un código válido.";
    } else if (!/^\d+$/.test(sensorCode)) {
      newErrors.sensorCode = "El código debe ser un número.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const plot_id = localStorage.getItem("selectedPlotId");
        const sensor = { name: selectedSensor, plot_id, code: sensorCode };
        await addLinkedSensor(sensor);

        setSuccessMessage(`El sensor "${selectedSensor}" con código "${sensorCode}" ha sido enlazado correctamente.`);
        setSensorCode("");
        setTimeout(() => setSuccessMessage(""), 5000);
      } catch (error) {
        setErrors({ sensorCode: error.message || "Error al crear el sensor" });
      }
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
            {errors.sensorCode && (
              <p className="sensor-error-message">{errors.sensorCode}</p>
            )}
          </div>
          <div className="add-sensor-content-buttons">
            <button type="submit" className="btn-enla">
              Enlazar
            </button>
            <Link to="/sensors">
              <button className="btn-back">Volver</button>
            </Link>
          </div>
        </form>
        {successMessage && (
          <p className="sensor-success-message">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default AddSensor;
