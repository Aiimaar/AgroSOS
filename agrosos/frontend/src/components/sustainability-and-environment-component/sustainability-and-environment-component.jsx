import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./sustainability-and-environment-component.css";

function SustainabilityAndEnvironmentComponent() {
  const navigate = useNavigate();

  return (
    <>
      <button className="sustainability-back-button" onClick={() => navigate("/advices")}>
        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
      </button>
      <div className="sustainability-container">
        <div className="sustainability-header">
          <h2>Sostenibilidad y medio ambiente</h2>
        </div>

        <div className="sustainability-txt">
          <h3>1. Conservación</h3>
          <p>
            Implementa prácticas de conservación de agua como la captura de agua
            de lluvia. Recicla el agua utilizada siempre que sea posible.
          </p>
          <h3>2. Agricultura Orgánica</h3>
          <p>
            Reduce el uso de pesticidas y fertilizantes sintéticos. Promueve la
            biodiversidad plantando setos y manteniendo áreas de hábitat
            natural.
          </p>
          <h3>3. Gestión de Residuos</h3>
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
