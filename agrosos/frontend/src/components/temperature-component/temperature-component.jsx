import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./temperature-component.css";
import { useState } from "react";

function TemperatureComponent() {
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const navigate = useNavigate();

  const handleTemperatureChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setOperator(newComparison);
  };

  const handleApplyCondition = () => {
    const temperatureCondition = {
      type: "humidity",
      value: parseInt(value),
      operator,
    };
    const existingConditions = JSON.parse(sessionStorage.getItem("temperatureConditions")) || [];
    existingConditions.push(temperatureCondition);
    sessionStorage.setItem("temperatureConditions", JSON.stringify(existingConditions));
    navigate(-1);
  };

  return (
    <div id="temperature-component-container">
      <div className="temperature-component-arrow" aria-label="Volver a la página anterior" onClick={() => navigate(-1)}>
        <FaArrowLeft className="temperature-component-arrow-icon" />
      </div>
      <h1 id="temperature-heading">Temperatura</h1>
      <div className="temperature-controls" role="group" aria-labelledby="comparison-controls">
        <h2 id="comparison-controls" className="sr-only">Controles de comparación de temperatura</h2>
        <button
          className={`temperature-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
        >
          {"<"}
        </button>
        <button
          className={`temperature-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
        >
          {"="}
        </button>
        <button
          className={`temperature-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
        >
          {">"}
        </button>
      </div>
      <div className="temperature-display">
        <span className="temperature-indicator" aria-live="polite">
          {value}°C
        </span>
      </div>
      <div className="temperature-slider">
        <label htmlFor="temperatureRange" className="sr-only">Ajuste de temperatura</label>
        <input
          id="temperatureRange"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleTemperatureChange}
          aria-valuenow={value}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-label="Ajustar temperatura"
        />
        <div className="temperature-limits">
          <span>-10°C</span>
          <span>40°C</span>
        </div>
      </div>
      <div className="temperature-apply">
        <button
          className="temperature-apply-button"
          onClick={handleApplyCondition}
          aria-label="Aplicar condición de temperatura"
        >
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default TemperatureComponent;
