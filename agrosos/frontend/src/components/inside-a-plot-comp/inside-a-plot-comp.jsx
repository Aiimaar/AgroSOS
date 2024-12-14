import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import EvolutionGraph from "./graphic-comp";
import ReactClock from "react-clock";
import "react-clock/dist/Clock.css";
import { useNavigate } from "react-router-dom";
import "./inside-a-plot-comp.css";

const InsideAPlotComp = ({ plotId }) => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [sensorValues, setSensorValues] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // Estado para la sección de riego
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clockValue, setClockValue] = useState(new Date());
  const [isClockPopupVisible, setIsClockPopupVisible] = useState(false);
  const [manualTime, setManualTime] = useState("");

  // Estado para el plotId
  const [localPlotId, setLocalPlotId] = useState(null);

  const days = [
    { name: "Monday", label: "Lunes" },
    { name: "Tuesday", label: "Martes" },
    { name: "Wednesday", label: "Miércoles" },
    { name: "Thursday", label: "Jueves" },
    { name: "Friday", label: "Viernes" },
    { name: "Saturday", label: "Sábado" },
    { name: "Sunday", label: "Domingo" },
  ];

  useEffect(() => {
    const storedPlotId = localStorage.getItem("selectedPlotId");
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No tienes un token válido. Inicia sesión.");
      navigate("/login");
      return;
    }
    if (storedPlotId) {
      setLocalPlotId(storedPlotId);
      fetchData(storedPlotId, token);
    } else {
      setError("No se encontró un terreno seleccionado.");
    }

    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchData = async (plotId, token) => {
    try {
      console.log("Solicitando datos para el plotId:", plotId);

      const cropResponse = await axios.get(
        `http://localhost:3000/api/crops/plot/${plotId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCrop(cropResponse.data);

      const sensorResponse = await axios.get(
        `http://localhost:3000/api/sensor_value/plot/${plotId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Respuesta de los sensores:", sensorResponse.data);

      if (Array.isArray(sensorResponse.data)) {
        setSensorValues(sensorResponse.data);
      } else {
        console.error(
          "Los datos de los sensores no son un array:",
          sensorResponse.data
        );
        setSensorValues([]);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      if (error.response && error.response.status === 401) {
        alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
        navigate("/login");
      } else {
        setError(
          "Error al cargar los datos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const calculateAverage = (sensorType) => {
    const filteredSensors = sensorValues.filter(
      (sensor) => sensor.Sensor.type === sensorType
    );
    if (filteredSensors.length > 0) {
      const sum = filteredSensors.reduce(
        (total, sensor) => total + sensor.value,
        0
      );
      return sum / filteredSensors.length;
    }
    return null;
  };

  const handleClick = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((selectedDay) => selectedDay !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleTimeSelect = () => {
    const formattedTime = manualTime.includes(":")
      ? manualTime
      : `${manualTime}:00`; // Asegúrate de que tenga ':MM' si no tiene.
    setSelectedTime(formattedTime);
    setIsClockPopupVisible(false);
  };

  const handleProgramarRiego = async () => {
    if (!localPlotId) {
      alert("El ID del terreno no está definido.");
      return;
    }

    if (selectedDays.length > 0 && selectedTime) {
      try {
        // Asegúrate de que 'selectedDays' sea un array (no string) y 'selectedTime' esté bien formateado
        const irrigationSchedule = {
          plotId: localPlotId,
          startDate: new Date().toISOString(),
          endDate: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ).toISOString(),
          days: selectedDays, // Debe ser un array, no un string
          time: selectedTime, // Asegúrate de que 'selectedTime' esté en formato 'HH:MM'
        };

        console.log("Datos enviados al backend:", irrigationSchedule);

        const response = await axios.post(
          "http://localhost:3000/api/irrigation_schedule",
          irrigationSchedule,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        console.log("Programación de riego guardada:", response.data);
        alert("Riego programado exitosamente.");
      } catch (error) {
        console.error("Error al guardar la programación de riego:", error);
        alert("Hubo un error al guardar la programación de riego.");
      }
    } else {
      alert("Selecciona al menos un día y una hora para programar el riego.");
    }
  };

  const handleClickOutside = (event) => {
    if (
      isClockPopupVisible &&
      !event.target.closest(".clock-popup") &&
      !event.target.closest(".irrigation-frecuency-pro")
    ) {
      setIsClockPopupVisible(false);
    }
  };

  return (
    <div className="plot-details">
      {error && <p className="inside-a-plot-error-message">{error}</p>}
      <section className="crops-section">
        <h3>Cultivo en el terreno</h3>
        {crop ? (
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

      <section id="inside-a-plot-comp-global">
        <div id="inside-a-plot-comp-left">
          <div className="inside-a-plot-comp-left">
            <section className="evolution-section">
              <h3>Evolución Temperatura / Humedad</h3>
              <EvolutionGraph plotId={plotId} />
            </section>
          </div>

          <div className="inside-a-plot-comp-left">
            <section className="tasks-section">
              <h3>Tareas</h3>
              <ul className="task-list">
                {tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
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
        </div>

        <div id="inside-a-plot-comp-right">
          <div className="inside-a-plot-comp-right">
            <section className="climate-section">
              <h3>Clima</h3>
              {sensorValues.length > 0 ? (
                <div className="climate-stats">
                  {[
                    "temperature",
                    "soil_temperature",
                    "humidity",
                    "soil_humidity",
                  ].map((sensorType) => {
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
          </div>

          <div className="inside-a-plot-comp-right">
            <section className="irrigation-frecuency-section">
              <div id="irrigation-frecuency-component">
                <h3 className="irrigation-frecuency-title">
                  Frecuencia de riego
                </h3>
                <p className="irrigation-frecuency-p">Días de riego</p>
                <div className="irrigation-frecuency-calendar">
                  {days.map((day) => (
                    <div key={day.name} className="irrigation-frecuency-day">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        size="2xl"
                        className={`irrigation-frecuency-calendar-icon ${
                          selectedDays.includes(day.name) ? "selected" : ""
                        }`}
                        onClick={() => handleClick(day.name)}
                      />
                      <span className="irrigation-frecuency-day-label">
                        {day.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Selección de hora */}
                <div className="select-time-container">
                  <button
                    className={
                      selectedTime
                        ? "select-time-main-button-selected"
                        : "select-time-main-button-unselected"
                    }
                    onClick={() => setIsClockPopupVisible(true)}
                  >
                    {selectedTime
                      ? `Hora seleccionada: ${selectedTime}`
                      : "Seleccionar hora"}
                  </button>
                </div>

                {/* Modal de selección de hora */}
                {isClockPopupVisible && (
                  <div className="clock-popup" id="clock-popup">
                    <div className="clock-popup-content">
                      <ReactClock
                        value={clockValue}
                        onChange={(value) => {
                          setClockValue(value);
                          const hours = value
                            .getHours()
                            .toString()
                            .padStart(2, "0");
                          const minutes = value
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          setSelectedTime(`${hours}:${minutes}`);
                        }}
                        size={200}
                        renderNumbers={true}
                      />
                      <input
                        type="text"
                        value={manualTime}
                        onChange={(e) => setManualTime(e.target.value)}
                        placeholder="HH:MM"
                        className="manual-time-input"
                      />
                      <button
                        className="select-time-button"
                        onClick={handleTimeSelect}
                      >
                        Confirmar hora
                      </button>
                      <button class="irrigation-frecuency-pro">
                        Programar riego
                      </button>
                    </div>
                  </div>
                )}

                {/* Botón para programar riego */}
                <button
                  className="irrigation-frecuency-pro"
                  onClick={handleProgramarRiego}
                >
                  Programar riego
                </button>
              </div>
            </section>
          </div>

          <div className="inside-a-plot-comp-left">
            <section className="inside-a-plot-actions-section">
              <h3>Acciones</h3>
              <div className="inside-a-plot-actions-buttons-container">
                <button className="inside-a-plot-action-button">
                  Activar Riego
                </button>
                <button className="inside-a-plot-action-button">
                  Desactivar Riego
                </button>
              </div>
            </section>
          </div>
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
