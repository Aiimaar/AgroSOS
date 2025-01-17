import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./soil-temperature-component.css";
import { useState } from "react";

function SoilTemperatureComponent() {
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const navigate = useNavigate();

  const handleSoilTemperatureChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setOperator(newComparison);
  };

  const handleApplyCondition = () => {
    const soilTemperatureCondition = {
      type: "soilTemperature",
      value: parseInt(value),
      operator,
    };

    // Guardar en sessionStorage
    const existingConditions =
      JSON.parse(sessionStorage.getItem("soilTemperatureConditions")) || [];
    existingConditions.push(soilTemperatureCondition);
    sessionStorage.setItem(
      "soilTemperatureConditions",
      JSON.stringify(existingConditions)
    );
    navigate(-1);
  };

  return (
    <div id="soil-temperature-component-container">
      <div className="soil-temperature-component-arrow" aria-label="Regresar a la página anterior">
        <FaArrowLeft className="soil-humidity-component-arrow-icon" />
      </div>
      <h1>Temperatura del Terreno</h1>
      <div className="soil-temperature-controls" role="group" aria-labelledby="comparison-controls">
        <h2 id="comparison-controls" className="sr-only">Controles de comparación de temperatura</h2>
        <button
          className={`soil-temperature-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
        >
          {"<"}
        </button>
        <button
          className={`soil-temperature-button-equal ${
            operator === "=" ? "active" : ""
          }`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
        >
          {"="}
        </button>
        <button
          className={`soil-temperature-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
        >
          {">"}
        </button>
      </div>
      <div className="soil-temperature-display">
        <span className="soil-temperature-indicator" aria-live="polite">
          {value}%
        </span>
      </div>
      <div className="soil-temperature-slider">
        <label htmlFor="soilTemperatureRange" className="sr-only">Ajuste de temperatura del terreno</label>
        <input
          id="soilTemperatureRange"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleSoilTemperatureChange}
          aria-valuenow={value}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-label="Ajustar temperatura del terreno"
        />
        <div className="soil-temperature-limits">
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="soil-temperature-apply">
        <button
          className="soil-temperature-apply-button"
          onClick={handleApplyCondition}
          aria-label="Aplicar condición de temperatura"
        >
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default SoilTemperatureComponent;
