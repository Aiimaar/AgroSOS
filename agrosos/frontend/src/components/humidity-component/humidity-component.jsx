import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./humidity-component.css";
import { useState } from "react";
import { useDarkMode } from './path-to-your-DarkModeProvider'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

function HumidityComponent() {
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const { darkMode } = useDarkMode();
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

    const existingConditions =
      JSON.parse(sessionStorage.getItem("humidityConditions")) || [];
    existingConditions.push(humidityCondition);
    sessionStorage.setItem(
      "humidityConditions",
      JSON.stringify(existingConditions)
    );
    console.log("Updated sessionStorage:", JSON.parse(sessionStorage.getItem("humidityConditions")));
    navigate(-1);
  };

  return (
    <div id="humidity-component-container" className={darkMode ? 'dark-mode' : ''} aria-labelledby="humidity-component-title">
      <div className="humidity-component-arrow" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="humidity-component-arrow-icon" />
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
