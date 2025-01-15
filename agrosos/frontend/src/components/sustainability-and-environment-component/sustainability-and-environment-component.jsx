import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./sustainability-and-environment-component.css";

function SustainabilityAndEnvironmentComponent() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="sustainability-back-button"
        onClick={() => navigate("/advices")}
        aria-label="Volver a la página de consejos"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
      </button>
      <div className="sustainability-container">
        <div className="sustainability-header">
          <h2 id="sustainability-header">Sostenibilidad y medio ambiente</h2>
        </div>

        <div className="sustainability-txt">
          <h3 id="conservation" tabIndex="0">1. Conservación</h3>
          <p>
            Implementa prácticas de conservación de agua como la captura de agua
            de lluvia. Recicla el agua utilizada siempre que sea posible.
          </p>
          <h3 id="organic-farming" tabIndex="0">2. Agricultura Orgánica</h3>
          <p>
            Reduce el uso de pesticidas y fertilizantes sintéticos. Promueve la
            biodiversidad plantando setos y manteniendo áreas de hábitat
            natural.
          </p>
          <h3 id="waste-management" tabIndex="0">3. Gestión de Residuos</h3>
          <p>
            Compostaje de residuos orgánicos para crear fertilizante natural.
            Recicla y reutiliza materiales cuando sea posible.
          </p>
        </div>
      </div>
    </>
  );
}

export default SustainabilityAndEnvironmentComponent;
