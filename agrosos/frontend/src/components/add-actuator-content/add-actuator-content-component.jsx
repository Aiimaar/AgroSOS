import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./add-actuator-content-component.css";
import lock from "./icon_lock_locked_.png";

function AddActuatorContentComponent() {
  const [searchParams] = useSearchParams();
  const actuatorName = searchParams.get("name");
  const [actuatorCode, setActuatorCode] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const actuatorNames = {
    Riego: "Irrigation",
    Ventilación: "Ventilation",
    "Cobertura de Cultivos": "Crop Coverage",
    "Apertura de Ventanas": "Window Opening",
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plotId = localStorage.getItem("selectedPlotId");

    if (!plotId) {
      setError("No se ha seleccionado ningún terreno.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/actuators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: actuatorNames[actuatorName],
          code: Number(actuatorCode),
          plot_id: Number(plotId),
        }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar actuador");
      }
      setActuatorCode(""); // Limpiar el campo de código
      setSuccessMessage(
        `Actuador "${actuatorName}" con código "${actuatorCode}" enlazado con éxito.`
      ); // Mensaje de éxito
      setTimeout(() => setSuccessMessage(""), 5000); // Limpiar el mensaje después de 5 segundos
    } catch (error) {
      console.error("Error al agregar actuador:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container-add-actuator">
      <div className="form-add-actuator">
        <h1 className="actuator-form-title">Enlazar actuador</h1>
        <form className="actuator-form" onSubmit={handleSubmit}>
          <div className="form-group-actuator-name">
            <label
              htmlFor="actuator-name-input"
              className="label-actuator-name"
            >
              Nombre del actuador
            </label>
            <div className="actuator-input-container">
              <input
                type="text"
                id="actuator-name-input"
                className="input-actuator-name"
                value={actuatorName}
                readOnly
                aria-readonly="true"
                aria-label={`Nombre del actuador: ${actuatorName}`}
              />
              <img
                src={lock}
                alt="Icono de bloqueo"
                className="lock-icon"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="form-group-actuator-code">
            <label
              htmlFor="actuator-code-input"
              className="label-actuator-code"
            >
              Código del actuador a enlazar
            </label>
            <input
              type="number"
              id="actuator-code-input"
              className="input-actuator-code"
              placeholder="Ingrese el código"
              value={actuatorCode}
              onChange={(e) => setActuatorCode(e.target.value)}
              aria-label="Código del actuador a enlazar"
              required
            />
          </div>
          {error && <p className="error-message" role="alert">{error}</p>}
          {successMessage && (
            <p className="actuator-success-message" role="alert">{successMessage}</p>
          )}
          <div className="add-actuator-content-buttons">
            <button type="submit" className="btn-enla" aria-label="Enlazar actuador">
              Enlazar
            </button>
            <Link to="/actuators" aria-label="Volver a la lista de actuadores">
              <button className="btn-back">Volver</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActuatorContentComponent;
