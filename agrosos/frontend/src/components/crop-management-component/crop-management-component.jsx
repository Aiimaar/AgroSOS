import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./crop-management-component.css";

function CropManagementComponent() {
  const navigate = useNavigate();

  return (
    <>
      <button className="back-button" onClick={() => navigate("/advices")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className="crop-management-container">
        <div className="crop-management-header">
          <h2>Manejo de cultivos</h2>
        </div>

        <div className="crop-management-txt">
          <h3>1. Selección</h3>
          <p>
            Elige variedades de cultivos que sean resistentes a enfermedades
            comunes en tu área. Considera cultivos que se adapten bien al clima
            y al suelo de tu región.
          </p>
          <h3>2. Riego</h3>
          <p>
            Implementa sistemas de riego eficientes, como el riego por goteo,
            para ahorrar agua. Riega temprano en la mañana o tarde en la noche
            para minimizar la evaporación.
          </p>
          <h3>3. Control de Plagas y Enfermedades</h3>
          <p>
            Utiliza técnicas de control integrado de plagas (CIP) para minimizar
            el uso de pesticidas químicos. Introduce insectos beneficiosos que
            depreden las plagas comunes.
          </p>
        </div>
      </div>
    </>
  );
}

export default CropManagementComponent;
