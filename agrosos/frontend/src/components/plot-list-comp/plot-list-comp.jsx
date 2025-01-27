import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./plot-list-comp.css";
import fondo1 from "../../components/plot-list-comp/fondo1.jpg";
import fondo2 from "../../components/plot-list-comp/fondo2.jpg";
import fondo3 from "../../components/plot-list-comp/fondo3.png";
import fondo4 from "../../components/plot-list-comp/fondo4.jpg";
import fondo5 from "../../components/plot-list-comp/fondo5.jpg";
import AddPlotComponent from "../add-plot-component/add-plot-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "../../context/DarkModeContext";

function PlotListComp() {
  const { t, i18n } = useTranslation(); // Obtén las funciones de traducción
  const [plots, setPlots] = useState([]);
  const [sensorAverages, setSensorAverages] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editPlot, setEditPlot] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", size: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [plotToDelete, setPlotToDelete] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const defaultImages = [fondo1, fondo2, fondo3, fondo4, fondo5];
  const imageMap = {};

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
    console.log("Idioma actual al cargar el componente:", i18n.language); // Verificar idioma al cargar

    // Si el idioma es español y quieres cambiarlo a inglés automáticamente
    if (i18n.language === "es") {
      i18n.changeLanguage("en");
      console.log("Idioma cambiado a inglés automáticamente");
    }
  }, []);

  useEffect(() => {
    console.log("Idioma actualizado:", i18n.language); // Detectar cambios en el idioma
  }, [i18n.language]);

  useEffect(() => {
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
      const response = await axios.get(
        `http://localhost:3000/api/plots/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlots(response.data);
      fetchSensorAverages(response.data, token);
    } catch (error) {
      console.error("Error al obtener la lista de terrenos:", error);
      setErrorMessage(t("error_message_loading_plots"));
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
          console.error(
            `Error al obtener sensores del terreno ${plot.id}:`,
            error
          );
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
      const sum = filteredSensors.reduce(
        (total, sensor) => total + sensor.value,
        0
      );
      return (sum / filteredSensors.length).toFixed(0);
    }
    return "--";
  };

  const assignDefaultImage = (id) => {
    if (!imageMap[id]) {
      const randomIndex = Object.keys(imageMap).length % defaultImages.length;
      imageMap[id] = defaultImages[randomIndex];
    }
    return imageMap[id];
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
      setShowDeleteModal(false);
      setPlotToDelete(null);
    } catch (error) {
      console.error(
        "Error al eliminar parcela:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const confirmDeletePlot = (plotId) => {
    setPlotToDelete(plotId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPlotToDelete(null);
  };

  const handleEditPlot = (plot) => {
    setEditPlot(plot);
    setEditForm({ name: plot.name, size: plot.size });
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
      setPlots((prevPlots) =>
        prevPlots.map((plot) =>
          plot.id === id
            ? { ...plot, name: editForm.name, size: editForm.size }
            : plot
        )
      );
      setEditPlot(null);
    } catch (error) {
      console.error("Error al editar el terreno:", error);
    }
  };

  const handlePlotClick = (plotId, plotName) => {
    localStorage.setItem("selectedPlotId", plotId);
    localStorage.setItem("selectedPlotName", plotName);
    console.log("Plot selected:", { plotId, plotName }); // Agrega este log
    navigate("/inside-a-plot");
  };
  

  return (
    <>
      {plots.length === 0 ? (
        <AddPlotComponent />
      ) : (
        <>
          {showDeleteModal && (
            <div className={`modal-overlay ${darkMode ? "dark-mode" : ""}`}>
              <div className="plot-list-delete-modal">
                <h3>{t("confirm_delete_plot")}</h3>
                <div className="modal-actions">
                  <button type="submit" onClick={handleDeletePlot}>
                    {t("delete")}
                  </button>
                  <button type="button" onClick={cancelDelete}>
                    {t("cancel")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {editPlot && (
            <div className={`modal-overlay ${darkMode ? "dark-mode" : ""}`}>
              <div className="plot-list-edit-modal">
                <h3>{t("edit_plot")}</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitEditForm();
                  }}
                >
                  <label>
                    {t("name")}:
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditFormChange}
                    />
                  </label>
                  <label>
                    {t("size")}:
                    <input
                      type="number"
                      name="size"
                      value={editForm.size}
                      onChange={handleEditFormChange}
                    />
                  </label>
                  <button type="submit">{t("save")}</button>
                  <button type="button" onClick={() => setEditPlot(null)}>
                    {t("cancel")}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="plot-list-welcome">
            <h3>{t("good_morning")}</h3>
          </div>
          <div className="plot-list-container">
            {errorMessage && (
              <p className="plot-list-error-message">{errorMessage}</p>
            )}
            <div className="plot-list">
              {plots.map((plot) => (
                <div
                  key={plot.id}
                  className="plot-card"
                  tabIndex="0"
                  role="button"
                  onClick={() => handlePlotClick(plot.id, plot.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePlotClick(plot.id, plot.name);
                  }}
                  style={{ backgroundColor: plot.color || "transparent" }}
                >
                  {plot.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${plot.image}`}
                      alt={`${t("plot_image")} ${plot.name}`}
                      className="plot-image"
                    />
                  ) : plot.color ? (
                    <div className="plot-image" />
                  ) : (
                    <img
                      src={assignDefaultImage(plot.id)}
                      alt={`${t("default_plot_image")} ${plot.name}`}
                      className="plot-image"
                    />
                  )}
                  <div className="terrain-name">{plot.name}</div>
                  <div className="card-footer">
                    <div className="plot-list-actions">
                      <div
                        className="plot-list-button plot-list-edit-button"
                        tabIndex="0"
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPlot(plot);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.stopPropagation();
                            handleEditPlot(plot);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </div>
                      <div
                        className="plot-list-button plot-list-delete-button"
                        tabIndex="0"
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeletePlot(plot.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.stopPropagation();
                            confirmDeletePlot(plot.id);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
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
      )}
    </>
  );
}

export default PlotListComp;
