import arrow from "./ArrowLeftOutlined.png";
import "./humidity-component.css";
import { useState } from "react";

function HumidityComponent() {
  const [humidity, setHumidity] = useState(23);
  const [comparison, setComparison] = useState("="); // Para <, =, >

  const handleHumidityChange = (e) => {
    setHumidity(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setComparison(newComparison);
  };

  const handleApplyCondition = () => {
    // Crear el objeto de condición de humedad
    const humidityCondition = {
      humidity,
      comparison,
    };

    // Guardar en localStorage
    const existingConditions = JSON.parse(localStorage.getItem("humidityConditions")) || [];
    existingConditions.push(humidityCondition);
    localStorage.setItem("humidityConditions", JSON.stringify(existingConditions));

    // Redirigir de vuelta al formulario
    window.location.href = "/add-rule";
  };

  return (
    <div id="humidity-component-container">
      <div className="humidity-component-arrow">
        <img src={arrow} alt="arrow" className="humidity-component-arrow-img" />
      </div>
      <h1>Humedad</h1>
      <div className="humidity-controls">
        <button
          className={`humidity-button ${comparison === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${comparison === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
        >
          {"="}
        </button>
        <button
          className={`humidity-button ${comparison === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
        >
          {">"}
        </button>
      </div>
      <div className="humidity-display">
        <span className="humidity-indicator">{humidity}%</span>
      </div>
      <div className="humidity-slider">
        <input
          type="range"
          min="-10"
          max="40"
          value={humidity}
          onChange={handleHumidityChange}
        />
        <div className="humidity-limits">
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="humidity-apply">
        <button className="humidity-apply-button" onClick={handleApplyCondition}>
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default HumidityComponent;
