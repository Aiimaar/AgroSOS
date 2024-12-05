import { useNavigate, useLocation } from "react-router-dom";
import arrow from "./ArrowLeftOutlined.png";
import "./soil-temperature-component.css";
import { useState } from "react";

function SoilTemperatureComponent() {
  const [soilTemperature, setSoilTemperature] = useState(23);
  const [comparison, setComparison] = useState("=");
  const navigate = useNavigate();

  const handleSoilTemperatureChange = (e) => {
    setSoilTemperature(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setComparison(newComparison);
  };

  const handleApplyCondition = () => {
    const soilTemperatureCondition = {
      soilTemperature,
      comparison,
    };

    // Guardar en localStorage
    const existingConditions =
      JSON.parse(localStorage.getItem("soilTemperatureConditions")) || [];
    existingConditions.push(soilTemperatureCondition);
    localStorage.setItem(
      "soilTemperatureConditions",
      JSON.stringify(existingConditions)
    );
    navigate(-1);
  };

  return (
    <div id="soil-temperature-component-container">
      <div className="soil-temperature-component-arrow">
        <img src={arrow} alt="arrow" className="soil-temperature-component-arrow-img" />
      </div>
      <h1>Temperatura del Terreno</h1>
      <div className="soil-temperature-controls">
        <button
          className={`soil-temperature-button ${comparison === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {"<"}
        </button>
        <button
          className={`temperature-button-equal ${
            comparison === "=" ? "active" : ""
          }`}
          onClick={() => handleComparisonChange("=")}
        >
          {"="}
        </button>
        <button
          className={`temperature-button ${comparison === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
        >
          {">"}
        </button>
      </div>
      <div className="soil-temperature-display">
        <span className="soil-temperature-indicator">{soilTemperature}%</span>
      </div>
      <div className="soil-temperature-slider">
        <input
          type="range"
          min="-10"
          max="40"
          value={soilTemperature}
          onChange={handleSoilTemperatureChange}
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
        >
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default SoilTemperatureComponent;
