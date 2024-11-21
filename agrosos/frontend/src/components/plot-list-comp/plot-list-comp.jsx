import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./plot-list-comp.css";

function PlotListComp() {
  const [plots, setPlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingPlot, setEditingPlot] = useState(null);
  const [editingPlotName, setEditingPlotName] = useState("");
  const [editingPlotSize, setEditingPlotSize] = useState("");
  const [editingPlotImage, setEditingPlotImage] = useState(null);
  const [editingPlotTemperature, setEditingPlotTemperature] = useState("");
  const [editingPlotHumidity, setEditingPlotHumidity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (error) {
      console.error("Error al obtener la lista de terrenos:", error);
      setErrorMessage("Error al cargar los terrenos. Verifica tu sesión.");
    }
  };

  const handleDeletePlot = async (plotId) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(`http://localhost:3000/api/plots/${plotId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlots(plots.filter((plot) => plot.id !== plotId));
    } catch (error) {
      console.error(
        "Error al eliminar parcela:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditClick = (plot) => {
    setEditingPlot(plot.id);
    setEditingPlotName(plot.name);
    setEditingPlotSize(plot.size);
    setEditingPlotImage(plot.image);
    setEditingPlotTemperature(plot.temperature);
    setEditingPlotHumidity(plot.humidity);
  };

  const handleUpdatePlot = async (plotId) => {
    const token = localStorage.getItem("authToken");
    const updatedPlot = {
      name: editingPlotName,
      size: editingPlotSize,
      temperature: editingPlotTemperature,
      humidity: editingPlotHumidity,
      image: editingPlotImage,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/plots/${plotId}`,
        updatedPlot,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlots(
        plots.map((plot) => (plot.id === plotId ? response.data : plot))
      );
      setEditingPlot(null);
    } catch (error) {
      console.error(
        "Error al actualizar parcela:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleImageChange = (e) => {
    setEditingPlotImage(e.target.files[0]);
  };

  return (
    <>
      <div className="welcome">
        <h3>Buenos días!</h3>
      </div>
      <div className="plot-list-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="plot-list">
          {plots.map((plot) => (
            <div key={plot.id} className="plot-card">
              <img
                src={`http://localhost:3000/${plot.image}`}
                alt="Imagen del terreno"
                className="plot-image"
              />
              <div className="terrain-name">{plot.name}</div>
              <div className="card-footer">
                <div className="actions">
                  <div
                    className="button edit-button"
                    onClick={() => handleEditClick(plot)}
                  >
                    &#9998;
                  </div>
                  <div
                    className="button delete-button"
                    onClick={() => handleDeletePlot(plot.id)}
                  >
                    &#128465;
                  </div>
                </div>
                <div className="info">
                  <div className="info-item">
                    <span role="img" aria-label="temperature">
                      🌡️
                    </span>
                    <span>{plot.temperature || "--"}°C</span>
                  </div>
                  <div className="info-item">
                    <span role="img" aria-label="humidity">
                      💧
                    </span>
                    <span>{plot.humidity || "--"}%</span>
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
