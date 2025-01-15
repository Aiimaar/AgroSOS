import { useNavigate } from "react-router-dom";
import arrow from "./ArrowLeftOutlined.png";
import "./soil-humidity-component.css";
import { useState } from "react";

function SoilHumidityComponent() {
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const navigate = useNavigate();

  const handleSoilHumidityChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setOperator(newComparison);
  };

  const handleApplyCondition = () => {
    const soilHumidityCondition = {
      type: "soilHumidity",
      value: parseInt(value),
      operator,
    };

    // Guardar en sessionStorage
    const existingConditions =
      JSON.parse(sessionStorage.getItem("soilHumidityConditions")) || [];
    existingConditions.push(soilHumidityCondition);
    sessionStorage.setItem(
      "soilHumidityConditions",
      JSON.stringify(existingConditions)
    );
    navigate(-1);
  };

  return (
    <div
      id="soil-humidity-component-container"
      aria-labelledby="soil-humidity-title"
      role="region"
    >
      <div className="soil-humidity-component-arrow">
        <img
          src={arrow}
          alt="Volver"
          className="soil-humidity-component-arrow-img"
          role="button"
          tabIndex="0"
          aria-label="Volver a la página anterior"
          onClick={() => navigate(-1)}
        />
      </div>
      <h1 id="soil-humidity-title">Humedad del Terreno</h1>
      <div
        className="soil-humidity-controls"
        role="group"
        aria-labelledby="comparison-buttons-title"
      >
        <p id="comparison-buttons-title" className="visually-hidden">
          Botones para seleccionar comparación
        </p>
        <button
          className={`soil-humidity-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
          aria-label="Menor que"
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${
            operator === "=" ? "active" : ""
          }`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
          aria-label="Igual a"
        >
          {"="}
        </button>
        <button
          className={`humidity-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
          aria-label="Mayor que"
        >
          {">"}
        </button>
      </div>
      <div
        className="soil-humidity-display"
        role="status"
        aria-live="polite"
        aria-label={`Valor de humedad del terreno: ${value}%`}
      >
        <span className="soil-humidity-indicator">{value}%</span>
      </div>
      <div
        className="soil-humidity-slider"
        role="group"
        aria-labelledby="slider-label"
      >
        <label id="slider-label" htmlFor="soil-humidity-range">
          Control deslizante de humedad del terreno
        </label>
        <input
          id="soil-humidity-range"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleSoilHumidityChange}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-valuenow={value}
          aria-label={`Humedad del terreno: ${value}%`}
        />
        <div
          className="soil-humidity-limits"
          aria-hidden="true"
        >
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="soil-humidity-apply">
        <button
          className="soil-humidity-apply-button"
          onClick={handleApplyCondition}
          aria-label="Aplicar condición de humedad del terreno"
        >
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default SoilHumidityComponent;
