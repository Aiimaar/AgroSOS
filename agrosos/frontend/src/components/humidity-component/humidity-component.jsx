import { useNavigate, useLocation } from "react-router-dom";
import arrow from "./ArrowLeftOutlined.png";
import "./humidity-component.css";
import { useState } from "react";

function HumidityComponent() {
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const navigate = useNavigate();
  const location = useLocation();

  const handleHumidityChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newOperator) => {
    setOperator(newOperator);
  };

  const handleApplyCondition = () => {
    const humidityCondition = {
      type: "humidity",
      value: parseInt(value),
      operator,
    };
  
    // Recupera las condiciones actuales
    const existingConditions =
      JSON.parse(sessionStorage.getItem("humidityConditions")) || [];
  
    // Agrega la nueva condición
    existingConditions.push(humidityCondition);
    
    // Guarda las condiciones actualizadas en el sessionStorage
    sessionStorage.setItem(
      "humidityConditions",
      JSON.stringify(existingConditions)
    );
  
    // Verifica el contenido del sessionStorage
    console.log("Updated sessionStorage:", JSON.parse(sessionStorage.getItem("humidityConditions")));
  
    // Navega hacia atrás
    navigate(-1);
  };

  return (
    <div id="humidity-component-container" aria-labelledby="humidity-component-title">
      <div className="humidity-component-arrow">
        <img src={arrow} alt="Flecha para regresar" className="humidity-component-arrow-img" />
      </div>
      <h1 id="humidity-component-title">Humedad</h1>
      <div className="humidity-controls">
        <button
          className={`humidity-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
        >
          {"="}
        </button>
        <button
          className={`humidity-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
        >
          {">"}
        </button>
      </div>
      <div className="humidity-display">
        <span className="humidity-indicator" id="humidity-indicator">{value}%</span>
      </div>
      <div className="humidity-slider">
        <label htmlFor="humidity-slider" className="sr-only">Deslizador de humedad</label>
        <input
          id="humidity-slider"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleHumidityChange}
          aria-valuenow={value}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-labelledby="humidity-indicator"
        />
        <div className="humidity-limits">
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="humidity-apply">
        <button
          className="humidity-apply-button"
          onClick={handleApplyCondition}
          aria-label="Aplicar condición de humedad"
        >
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default HumidityComponent;
