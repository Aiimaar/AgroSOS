import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./soil-management-component.css";

function SoilManagementComponent() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="soil-back-button"
        onClick={() => navigate("/advices")}
        aria-label="Volver a la página de consejos"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div
        className="soil-management-container"
        role="main"
        aria-labelledby="soil-management-title"
      >
        <div className="soil-management-header">
          <h2 id="soil-management-title">Gestión del suelo</h2>
        </div>

        <div
          className="soil-management-txt"
          role="article"
          aria-labelledby="soil-management-instructions"
        >
          <p id="soil-management-instructions" className="visually-hidden">
            Instrucciones detalladas para la gestión del suelo.
          </p>

          <section aria-labelledby="soil-test-title">
            <h3 id="soil-test-title">1. Pruebas de Suelo</h3>
            <p>
              Realiza pruebas de suelo regularmente para conocer el pH y los
              niveles de nutrientes. Ajusta el pH del suelo según los
              requerimientos de tus cultivos.
            </p>
          </section>

          <section aria-labelledby="crop-rotation-title">
            <h3 id="crop-rotation-title">2. Rotación de Cultivos</h3>
            <p>
              Implementa una rotación de cultivos para evitar la depleción de
              nutrientes y reducir plagas y enfermedades. Alterna cultivos de
              raíces profundas con aquellos de raíces superficiales.
            </p>
          </section>

          <section aria-labelledby="fertilization-title">
            <h3 id="fertilization-title">3. Fertilización</h3>
            <p>
              Utiliza fertilizantes orgánicos siempre que sea posible. Aplica
              fertilizantes según los resultados de las pruebas de suelo.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default SoilManagementComponent;
