import React, { useState, useEffect } from "react";
import axios from "axios";
import "./inside-a-plot-comp.css";
import EvolutionGraph from "./graphic-comp";

const InsideAPlotComp = ({ plotId }) => {
  const [crop, setCrop] = useState(null); // Cultivo del terreno
  const [sensorValues, setSensorValues] = useState([]); // Inicializar como array vacío
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null); // Manejo de errores

  // Obtener cultivo y valores del sensor para el terreno
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener cultivo asociado al terreno
        const cropResponse = await axios.get(
          `http://localhost:3000/api/crops/plot/36`
        );
        setCrop(cropResponse.data);

        // Obtener valores del sensor para el terreno
        const sensorResponse = await axios.get(
          `http://localhost:3000/api/sensor_value/plot/36`
        );
        console.log("Respuesta de los sensores:", sensorResponse.data); // Ver los datos recibidos

        // Asegurarse de que sea un array
        if (Array.isArray(sensorResponse.data)) {
          setSensorValues(sensorResponse.data);
        } else {
          console.error(
            "Los datos de los sensores no son un array:",
            sensorResponse.data
          );
          setSensorValues([]); // Evitar error si no es un array
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError(
          "Error al cargar los datos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchData();
  }, [plotId]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      console.log("Nueva tarea añadida:", newTask);
      setNewTask("");
    }
  };

  return (
    <div className="plot-details">
      <section className="crops-section">
        <h3>Cultivo en el terreno</h3>
        {error ? (
          <p className="error-message">{error}</p>
        ) : crop ? (
          <div className="crop-details">
            <img
              src={`http://localhost:3000/uploads/${crop.crop_image}`} // Asegúrate de que este sea el puerto correcto de tu backend
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
            {sensorValues.map((sensor) => (
              <div key={sensor.id}>
                {sensor.Sensor.type === "temperature" && (
                  <p>
                    {sensor.value}°C <span>Temperatura</span>
                  </p>
                )}
                {sensor.Sensor.type === "soil_temperature" && (
                  <p>
                    {sensor.value}°C <span>Temperatura del terreno</span>
                  </p>
                )}
                {sensor.Sensor.type === "humidity" && (
                  <p>
                    {sensor.value}% <span>Humedad</span>
                  </p>
                )}
                {sensor.Sensor.type === "soil_humidity" && (
                  <p>
                    {sensor.value}% <span>Humedad del terreno</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Cargando datos de sensores...</p>
        )}
      </section>

      <section className="actions-section">
        <h3>Acciones</h3>
        <button className="action-button">Activar Riego</button>
        <button className="action-button">Desactivar Riego</button>
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

export default InsideAPlotComp;
