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
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver a la página anterior"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {/* Header con título */}
        <div className="advices-header">
          <h1 className="advices-title" aria-live="polite">
            <FontAwesomeIcon icon={faLightbulb} className="icon-lightbulb" />
            Consejos
          </h1>
        </div>

        {/* Tarjetas de Consejos */}
        <div
          className="advices-cards"
          role="region"
          aria-labelledby="advices-cards-title"
        >
          <div
            className="advice-card"
            onClick={() => handleCardClick("/soil-management")}
            role="button"
            aria-label="Ir a la gestión del suelo"
            tabIndex="0"
          >
            Gestión del suelo
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/crop-management")}
            role="button"
            aria-label="Ir al manejo de cultivos"
            tabIndex="0"
          >
            Manejo de cultivos
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/sustainability")}
            role="button"
            aria-label="Ir a sostenibilidad y medio ambiente"
            tabIndex="0"
          >
            Sostenibilidad y Medio Ambiente
          </div>
          <div
            className="advice-card"
            onClick={() => handleCardClick("/energy-efficiency")}
            role="button"
            aria-label="Ir a eficiencia energética"
            tabIndex="0"
          >
            Eficiencia Energética
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvicesComponent;
