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
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="crop-info">
        <div className="crop-image-container">
          <img
            src={cropImage}
            alt="Imagen del cultivo de ajo"
            className="crop-image"
          /> {/* Usa cropImage dinámicamente */}
        </div>
        <h1 className="crop-title">AJO</h1>
        <div className="chart-image-container">
          <img
            src={graficaAjo}
            alt="Gráfico de rendimiento del cultivo de ajo"
            className="chart-image"
          />
        </div>
      </div>
    </div>
  );
};

export default CropsDetailsHeaderComponent;
