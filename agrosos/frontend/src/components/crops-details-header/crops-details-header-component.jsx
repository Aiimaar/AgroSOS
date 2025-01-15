import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import graficaAjo from "./images/grafica-ajo.png";
import ajo from "./images/ajo.png";
import "./crops-details-header-component.css";

const CropsDetailsHeaderComponent = ({ cropImage = ajo, onBack }) => {
  const navigate = useNavigate(); // Define navigate

  return (
    <div className="crops-header">
      <button
        className="crop-details-back-button"
        onClick={onBack || (() => navigate("/advices"))} // Usa onBack si está definido, de lo contrario navigate
        aria-label="Volver a la página de consejos" // Descripción para los usuarios de lectores de pantalla
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="crop-info">
        <div className="crop-image-container">
          <img
            src={cropImage}
            alt="Imagen del cultivo" // Descripción de la imagen
            className="crop-image"
            aria-describedby="crop-title" // Relaciona la imagen con el título del cultivo
          />
        </div>
        <h1 className="crop-title" id="crop-title">AJO</h1> {/* Agrega id para referencia desde otros elementos */}
        <div className="chart-image-container">
          <img
            src={graficaAjo}
            alt="Gráfica de cultivo de ajo" // Descripción de la gráfica
            className="chart-image"
            aria-labelledby="crop-title" // Relaciona la gráfica con el título del cultivo
          />
        </div>
      </div>
    </div>
  );
};

export default CropsDetailsHeaderComponent;
