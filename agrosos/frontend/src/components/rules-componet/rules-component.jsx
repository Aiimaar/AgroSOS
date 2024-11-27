import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./rules-component.css";

function RulesComponent() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="rules-page">
      <div className="rules-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div className="rules-header">
          <h1 className="rules-title">
            <FontAwesomeIcon icon={faClipboardList} className="icon-list" />
            Reglas
          </h1>
        </div>

        <div className="rules-cards">
          <div
            className="rule-card"
            onClick={() => handleCardClick("/")}
          >
            Temperatura
          </div>
          <div
            className="rule-card"
            onClick={() => handleCardClick("/")}
          >
            Humedad
          </div>
          <div
            className="rule-card"
            onClick={() =>
              handleCardClick("/sustainability-and-enviroment")
            }
          >
            Frecuencia de Riego
          </div>
          <div
            className="rule-card"
            onClick={() => handleCardClick("/efficiency-energy")}
          >
            Reglas Existentes
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesComponent;
