import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./add-actuator-content-component.css"; // Asegúrate de tener este archivo
import lock from "./icon_lock_locked_.png";

function AddActuatorContentComponent() {
  const [searchParams] = useSearchParams();
  const actuatorName = searchParams.get("name");
  const [actuatorCode, setActuatorCode] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para mensajes de éxito

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
        // Ajusta la URL si es diferente
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
      {" "}
      {/* Asegúrate de tener esta clase en tu CSS */}
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
              />
              <img src={lock} alt="lock" className="lock-icon" />
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
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="actuator-success-message">{successMessage}</p>
          )}{" "}
          {/* Mostrar mensaje de éxito */}
          <div className="add-actuator-content-buttons">
            <button type="submit" className="btn-enla">
              Enlazar
            </button>
            <Link to="/actuators">
              <button className="btn-back">Volver</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActuatorContentComponent;
