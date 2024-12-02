import React, { useState, useEffect } from "react";
import axios from "axios";
import "./inside-a-plot-comp.css";
import EvolutionGraph from "./graphic-comp";

const InsideAPlotComp = ({ plotId }) => {
  const [crop, setCrop] = useState(null); 
  const [sensorValues, setSensorValues] = useState([]); 
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedPlotId = localStorage.getItem("selectedPlotId");
    if (storedPlotId) {
      fetchData(storedPlotId);
    } else {
      setError("No se encontró un terreno seleccionado.");
    }
  }, []);

  const fetchData = async (plotId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }
    
    try {
      const cropResponse = await axios.get(
        `http://localhost:3000/api/crops/plot/${plotId}`
      );
      setCrop(cropResponse.data);

      const sensorResponse = await axios.get(
        `http://localhost:3000/api/sensor_value/plot/${plotId}`
      );
      console.log("Respuesta de los sensores:", sensorResponse.data);

      if (Array.isArray(sensorResponse.data)) {
        setSensorValues(sensorResponse.data);
      } else {
        console.error("Los datos de los sensores no son un array:", sensorResponse.data);
        setSensorValues([]);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setError("Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      console.log("Nueva tarea añadida:", newTask);
      setNewTask("");
    }
  };

  const calculateAverage = (sensorType) => {
    const filteredSensors = sensorValues.filter(
      (sensor) => sensor.Sensor.type === sensorType
    );
    if (filteredSensors.length > 0) {
      const sum = filteredSensors.reduce((total, sensor) => total + sensor.value, 0);
      return sum / filteredSensors.length;
    }
    return null;
  };

  return (
    <div className="plot-details">
      <section className="crops-section">
        <h3>Cultivo en el terreno</h3>
        {error ? (
          <p className="inside-a-plot-error-message">{error}</p>
        ) : crop ? (
          <div className="crop-details">
            <img
              src={`http://localhost:3000/uploads/${crop.crop_image}`}
              alt={crop.name}
              title={crop.name}
              className="crop-image"
            />
          </div>
        ) : (
          <p className="no-crops">No hay cultivo registrado en este terreno.</p>
        )}
      </section>

      <section className="evolution-section">
        <h3>Evolución Temperatura / Humedad</h3>
        <EvolutionGraph plotId={plotId} />
      </section>

      <section className="climate-section">
        <h3>Clima</h3>
        {sensorValues.length > 0 ? (
          <div className="climate-stats">
            {["temperature", "soil_temperature", "humidity", "soil_humidity"].map((sensorType) => {
              const averageValue = calculateAverage(sensorType);
              if (averageValue !== null) {
                return (
                  <div key={sensorType}>
                    <p>
                      {sensorType.includes("temperature")
                        ? `${averageValue.toFixed(0)}°C`
                        : `${averageValue.toFixed(0)}%`}{" "}
                      <span>{getSensorLabel(sensorType)}</span>
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p>No hay sensores registrados.</p>
        )}
      </section>

      <section className="inside-a-plot-actions-section">
        <h3>Acciones</h3>
        <div className="inside-a-plot-actions-buttons-container">
        <button className="inside-a-plot-action-button">Activar Riego</button>
        <button className="inside-a-plot-action-button">Desactivar Riego</button>
        </div>
      </section>

      <section className="tasks-section">
        <h3>Tareas</h3>
        <ul className="task-list">
          <li>Regar</li>
          <li>Fumigar</li>
          <li>Podar</li>
        </ul>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            placeholder="Añadir tarea completada..."
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask} className="add-task-button">
            Añadir
          </button>
        </div>
      </section>
    </div>
  );
};

const getSensorLabel = (sensorType) => {
  switch (sensorType) {
    case "temperature":
      return "Temperatura";
    case "soil_temperature":
      return "Temperatura del terreno";
    case "humidity":
      return "Humedad";
    case "soil_humidity":
      return "Humedad del terreno";
    default:
      return "Desconocido";
  }
};

export default InsideAPlotComp;
