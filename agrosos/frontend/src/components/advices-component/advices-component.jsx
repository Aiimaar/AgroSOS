import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./advices-component.css";

function AdvicesComponent() {
  const navigate = useNavigate(); // Inicializar useNavigate

  // Función para manejar el clic en una tarjeta
  const handleCardClick = (path) => {
    navigate(path); // Navegar a la ruta proporcionada
  };

  return (
    <div className="advices-page">
      <div className="advices-container">
        {/* Botón de retroceso */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {/* Header con título */}
        <div className="advices-header">
          <h1 className="advices-title">
            <FontAwesomeIcon icon={faLightbulb} className="icon-lightbulb" />
            Consejos
          </h1>
        </div>

        {/* Tarjetas de Consejos */}
        <div className="advices-cards">
          <div
            className="advice-card"
            onClick={() => handleCardClick("/soil-management")}
          >
            Gestión del suelo
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/crop-management")}
          >
            Manejo de cultivos
          </div>
          <div
            className="advice-card"
            onClick={() =>
              handleCardClick("/sustainability")
            }
          >
            Sostenibilidad y Medio Ambiente
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/energy-efficiency")}
          >
            Eficiencia Energética
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvicesComponent;
