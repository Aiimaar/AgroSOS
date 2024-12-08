import { useNavigate, useLocation } from "react-router-dom";
import arrow from "./ArrowLeftOutlined.png";
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
    // Crear el objeto de condición de temperatura
    const temperatureCondition = {
      type: "humidity",
      value: parseInt(value),
      operator,
    };

    // Guardar en sessionStorage
    const existingConditions =
      JSON.parse(sessionStorage.getItem("temperatureConditions")) || [];
    existingConditions.push(temperatureCondition);
    sessionStorage.setItem(
      "temperatureConditions",
      JSON.stringify(existingConditions)
    );

    // Después de guardar en sessionStorage, navegar hacia atrás
    navigate(-1);
  };

  return (
    <div id="temperature-component-container">
      <div className="temperature-component-arrow">
        <img
          src={arrow}
          alt="arrow"
          className="temperature-component-arrow-img"
        />
      </div>
      <h1>Temperatura</h1>
      <div className="temperature-controls">
        <button
          className={`temperature-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {"<"}
        </button>
        <button
          className={`temperature-button-equal ${
            operator === "=" ? "active" : ""
          }`}
          onClick={() => handleComparisonChange("=")}
        >
          {"="}
        </button>
        <button
          className={`temperature-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
        >
          {">"}
        </button>
      </div>
      <div className="temperature-display">
        <span className="temperature-indicator">{value}°C</span>
      </div>
      <div className="temperature-slider">
        <input
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleTemperatureChange}
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
        >
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default TemperatureComponent;
