import React, { useState, useEffect } from "react";
import axios from "axios";
import "./crops-list-component.css";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const CropsListComponent = () => {
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  useEffect(() => {
    const fetchCrops = async () => {
      const authToken = localStorage.getItem("authToken"); // Reemplaza con tu método para obtener el token.

      if (!authToken) {
        navigate("/login");
      }

      try {
        const response = await axios.get("http://localhost:3000/api/crops", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data);
        setCrops(response.data);
      } catch (error) {
        console.error("Error al obtener cultivos", error);
        setError("Error al obtener los cultivos.");
      }
    };

    fetchCrops();
  }, []);

  const handleCropClick = async (cropId) => {
    const selectedPlotId = localStorage.getItem("selectedPlotId");
    if (!selectedPlotId) {
      alert("No hay un terreno seleccionado.");
      return;
    }

    console.log("Crop ID:", cropId);
    console.log("Selected Plot ID:", selectedPlotId);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:3000/api/plots/${selectedPlotId}`,
        { crop_id: cropId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cultivo asignado con éxito:", response.data);
      alert("Cultivo asignado con éxito."); // Confirmación de éxito
    } catch (error) {
      console.error("Error al asignar el cultivo al terreno", error);
      alert("Hubo un error al asignar el cultivo.");
    }
  };

  return (
    <div className={`crops-list ${darkMode ? 'dark-mode' : ''}`}>
      {error && <p className="error-message">{error}</p>}
      {/* Añadimos el rol="list" al contenedor */}
      <div role="list">
        {crops.map((crop) => (
          <div
            className="crop-item"
            key={crop.id}
            onClick={() => handleCropClick(crop.id)}
            role="listitem"
            aria-labelledby={`crop-title-${crop.id}`}
          >
            <div className="crop-content">
              <div className="crop-image-container">
                <img
                  src={`http://localhost:3000/uploads/${crop.crop_image}`}
                  alt={`Imagen del cultivo de ${crop.name}`}
                  className="crop-list-comp-image"
                  aria-describedby={`crop-description-${crop.id}`}
                />
                <button
                  className="info-icon"
                  onClick={() => navigate("/crop-details")}
                  aria-label={`Ver detalles de ${crop.name}`}
                >
                  i
                </button>
              </div>
              <div className="crop-text">
                <p
                  id={`crop-title-${crop.id}`}
                  className="harvest-title"
                  aria-hidden="true"
                >
                  {crop.name}
                </p>
                <p
                  id={`crop-description-${crop.id}`}
                  className="harvest-subtitle"
                  aria-hidden="true"
                >
                  {crop.start_month} - {crop.end_month}
                </p>
              </div>
            </div>
            <div className="divider" />
          </div>
        ))}
      </div>
    </div>
  );  
};

export default CropsListComponent;