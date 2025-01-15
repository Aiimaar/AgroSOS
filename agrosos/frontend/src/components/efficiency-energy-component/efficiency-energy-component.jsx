import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./efficiency-energy-component.css";

function EfficiencyEnergyComponent() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="efficiency-back-button"
        onClick={() => navigate("/advices")}
        aria-label="Volver a la página de consejos"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="efficiency-energy-container" aria-labelledby="efficiency-header">
        <div className="efficiency-energy-header">
          <h2 id="efficiency-header">Eficiencia Energética</h2>
        </div>
        <div className="efficiency-energy-txt" role="document">
          <h3>1. Energía Renovable</h3>
          <p>
            Considera la instalación de paneles solares o turbinas eólicas para
            reducir la dependencia de fuentes de energía no renovables. Utiliza
            biogás producido a partir de desechos agrícolas como fuente de
            energía.
          </p>

          <h3>2. Optimización del Uso de Energía</h3>
          <p>
            Implementa prácticas de eficiencia energética, como el uso de
            bombillas LED y equipos eficientes. Monitorea y gestiona el consumo
            de energía para identificar áreas de mejora y reducir costos.
          </p>
        </div>
      </div>
    </>
  );
}

export default EfficiencyEnergyComponent;
