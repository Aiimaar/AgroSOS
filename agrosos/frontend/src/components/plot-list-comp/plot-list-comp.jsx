import React, { useEffect, useState } from "react";
import axios from "axios";
import "./plot-list-comp.css";

function PlotListComp() {
  const [plots, setPlots] = useState([]);
  const [editingPlot, setEditingPlot] = useState(null);
  const [editingPlotName, setEditingPlotName] = useState("");
  const [editingPlotSize, setEditingPlotSize] = useState("");
  const [editingPlotImage, setEditingPlotImage] = useState(null);
  const [editingPlotTemperature, setEditingPlotTemperature] = useState("");
  const [editingPlotHumidity, setEditingPlotHumidity] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/plots")
      .then((response) => setPlots(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const handleDeletePlot = (plotId) => {
    axios
      .delete(`http://localhost:3000/api/plots/${plotId}`)
      .then(() => {
        setPlots(plots.filter((plot) => plot.id !== plotId));
      })
      .catch((error) => {
        console.error(
          "Error al eliminar parcela:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleEditClick = (plot) => {
    setEditingPlot(plot.id);
    setEditingPlotName(plot.name);
    setEditingPlotSize(plot.size);
    setEditingPlotImage(plot.image);
    setEditingPlotTemperature(plot.temperature);
    setEditingPlotHumidity(plot.humidity);
  };

  const handleUpdatePlot = (plotId) => {
    const updatedPlot = {
      name: editingPlotName,
      size: editingPlotSize,
      temperature: editingPlotTemperature,
      humidity: editingPlotHumidity,
      image: editingPlotImage,
    };

    axios
      .put(`http://localhost:3000/api/plots/${plotId}`, updatedPlot)
      .then((response) => {
        setPlots(
          plots.map((plot) => (plot.id === plotId ? response.data : plot))
        );
        setEditingPlot(null);
      })
      .catch((error) =>
        console.error(
          "Error al actualizar parcela:",
          error.response ? error.response.data : error.message
        )
      );
  };

  const handleImageChange = (e) => {
    setEditingPlotImage(e.target.files[0]);
  };

  return (
    <>
      <div className="welcome">
        <h3>Buenos dias!</h3>
      </div>
      <div className="plot-list-container">
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
