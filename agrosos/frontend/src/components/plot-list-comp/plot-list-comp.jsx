import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./plot-list-comp.css";

function PlotListComp() {
  const [plots, setPlots] = useState([]);
  const [sensorAverages, setSensorAverages] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editPlot, setEditPlot] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", size: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [plotToDelete, setPlotToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Añadir o quitar clase global según el estado del modal
    if (showDeleteModal || editPlot) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showDeleteModal, editPlot]);

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/plots", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlots(response.data);
      fetchSensorAverages(response.data, token);
    } catch (error) {
      console.error("Error al obtener la lista de terrenos:", error);
      setErrorMessage("Error al cargar los terrenos. Verifica tu sesión.");
    }
  };

  const fetchSensorAverages = async (plots, token) => {
    const averages = {};

    await Promise.all(
      plots.map(async (plot) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/sensor_value/plot/${plot.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const sensors = response.data;
          const temperatureAvg = calculateAverage(sensors, "temperature");
          const humidityAvg = calculateAverage(sensors, "humidity");

          averages[plot.id] = {
            temperature: temperatureAvg,
            humidity: humidityAvg,
          };
        } catch (error) {
          console.error(`Error al obtener sensores del terreno ${plot.id}:`, error);
        }
      })
    );

    setSensorAverages(averages);
  };

  const calculateAverage = (sensorValues, sensorType) => {
    const filteredSensors = sensorValues.filter(
      (sensor) => sensor.Sensor.type === sensorType
    );
    if (filteredSensors.length > 0) {
      const sum = filteredSensors.reduce((total, sensor) => total + sensor.value, 0);
      return (sum / filteredSensors.length).toFixed(0);
    }
    return "--";
  };

  const handleDeletePlot = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(`http://localhost:3000/api/plots/${plotToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlots(plots.filter((plot) => plot.id !== plotToDelete));
      const updatedAverages = { ...sensorAverages };
      delete updatedAverages[plotToDelete];
      setSensorAverages(updatedAverages);
      setShowDeleteModal(false); // Cerrar el modal después de eliminar
      setPlotToDelete(null); // Limpiar el terreno a eliminar
    } catch (error) {
      console.error(
        "Error al eliminar parcela:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const confirmDeletePlot = (plotId) => {
    setPlotToDelete(plotId);
    setShowDeleteModal(true); // Mostrar el modal de confirmación
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPlotToDelete(null); // Limpiar el terreno a eliminar
  };

  const handleEditPlot = (plot) => {
    setEditPlot(plot); // Guardar el terreno que se está editando
    setEditForm({ name: plot.name, size: plot.size }); // Cargar datos iniciales
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitEditForm = async () => {
    const token = localStorage.getItem("authToken");
    const { id } = editPlot;

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("size", editForm.size);

      await axios.put(`http://localhost:3000/api/plots/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar la lista de terrenos
      setPlots((prevPlots) =>
        prevPlots.map((plot) =>
          plot.id === id ? { ...plot, name: editForm.name, size: editForm.size } : plot
        )
      );
      setEditPlot(null); // Cerrar el formulario
    } catch (error) {
      console.error("Error al editar el terreno:", error);
    }
  };

  const handlePlotClick = (plotId) => {
    localStorage.setItem("selectedPlotId", plotId);
    navigate("/inside-a-plot");
  };

  return (
    <>
      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Deseas eliminar este terreno?</h3>
            <div className="modal-actions">
              <button onClick={handleDeletePlot}>Eliminar</button>
              <button onClick={cancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición de Terreno */}
      {editPlot && (
        <div className="modal-overlay">
          <div className="plot-list-edit-modal">
            <h3>Editar Terreno</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitEditForm();
              }}
            >
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                />
              </label>
              <label>
                Tamaño:
                <input
                  type="number"
                  name="size"
                  value={editForm.size}
                  onChange={handleEditFormChange}
                />
              </label>
              <button type="submit">Guardar</button>
              <button
                type="button"
                onClick={() => setEditPlot(null)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="plot-list-welcome">
        <h3>Buenos días!</h3>
      </div>
      <div className="plot-list-container">
        {errorMessage && <p className="plot-list-error-message">{errorMessage}</p>}
        <div className="plot-list">
          {plots.map((plot) => (
            <div key={plot.id} className="plot-card" onClick={() => handlePlotClick(plot.id)}>
              <img
                src={`http://localhost:3000/${plot.image}`}
                alt="Imagen del terreno"
                className="plot-image"
              />
              <div className="terrain-name">{plot.name}</div>
              <div className="card-footer">
                <div className="plot-list-actions">
                  <div
                    className="plot-list-button plot-list-edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditPlot(plot);
                    }}
                  >
                    &#9998;
                  </div>
                  <div
                    className="plot-list-button plot-list-delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDeletePlot(plot.id);
                    }}
                  >
                    &#128465;
                  </div>
                </div>
                <div className="plot-list-info">
                  <div className="plot-list-info-item">
                    <span role="img" aria-label="temperature">
                      🌡️
                    </span>
                    <span>
                      {sensorAverages[plot.id]?.temperature || "--"}°C
                    </span>
                  </div>
                  <div className="plot-list-info-item">
                    <span role="img" aria-label="humidity">
                      💧
                    </span>
                    <span>
                      {sensorAverages[plot.id]?.humidity || "--"}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlotListComp;
