import { useNavigate, useLocation } from "react-router-dom";
import arrow from "./ArrowLeftOutlined.png";
import "./soil-humidity-component.css";
import { useState } from "react";

function SoilHumidityComponent() {
  const [soilHumidity, setSoilHumidity] = useState(23);
  const [comparison, setComparison] = useState("=");
  const navigate = useNavigate();

  const handleSoilHumidityChange = (e) => {
    setSoilHumidity(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setComparison(newComparison);
  };

  const handleApplyCondition = () => {
    const soilHumidityCondition = {
      soilHumidity,
      comparison,
    };

    // Guardar en localStorage
    const existingConditions =
      JSON.parse(localStorage.getItem("soilHumidityConditions")) || [];
    existingConditions.push(soilHumidityCondition);
    localStorage.setItem(
      "soilHumidityConditions",
      JSON.stringify(existingConditions)
    );
    navigate(-1);
  };

  return (
    <div id="soil-humidity-component-container">
      <div className="soil-humidity-component-arrow">
        <img src={arrow} alt="arrow" className="soil-humidity-component-arrow-img" />
      </div>
      <h1>Humedad del Terreno</h1>
      <div className="soil-humidity-controls">
        <button
          className={`soil-humidity-button ${comparison === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${
            comparison === "=" ? "active" : ""
          }`}
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
      <div className="soil-humidity-display">
        <span className="soil-humidity-indicator">{soilHumidity}%</span>
      </div>
      <div className="soil-humidity-slider">
        <input
          type="range"
          min="-10"
          max="40"
          value={soilHumidity}
          onChange={handleSoilHumidityChange}
        />
        <div className="soil-humidity-limits">
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="soil-humidity-apply">
        <button
          className="soil-humidity-apply-button"
          onClick={handleApplyCondition}
        >
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default SoilHumidityComponent;
