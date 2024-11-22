import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./soil-management-component.css";

function SoilManagementComponent() {
  const navigate = useNavigate();

  return (
    <>
      <button className="back-button" onClick={() => navigate("/advices")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="soil-management-container">
        <div className="soil-management-header">
          <h2>Gestión del suelo</h2>
        </div>

        <div className="soil-management-txt">
          <h3>1. Pruebas de Suelo</h3>
          <p>
            Realiza pruebas de suelo regularmente para conocer el pH y los
            niveles de nutrientes. Ajusta el pH del suelo según los
            requerimientos de tus cultivos.
          </p>
          <h3>2. Rotación de Cultivos</h3>
          <p>
            Implementa una rotación de cultivos para evitar la depleción de
            nutrientes y reducir plagas y enfermedades. Alterna cultivos de
            raíces profundas con aquellos de raíces superficiales.
          </p>
          <h3>3. Fertilización</h3>
          <p>
            Utiliza fertilizantes orgánicos siempre que sea posible. Aplica
            fertilizantes según los resultados de las pruebas de suelo.
          </p>
        </div>
      </div>
    </>
  );
}

export default SoilManagementComponent;
