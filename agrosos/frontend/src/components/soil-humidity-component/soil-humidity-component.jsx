import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
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
    <div id="soil-humidity-component-container">
      <div className="soil-humidity-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="soil-humidity-component-arrow-icon" />
      </div>
      <h1>Humedad del Terreno</h1>
      <div className="soil-humidity-controls">
        <button
          className={`soil-humidity-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
        >
          {"="}
        </button>
        <button
          className={`humidity-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
        >
          {">"}
        </button>
      </div>
      <div className="soil-humidity-display">
        <span className="soil-humidity-indicator">{value}%</span>
      </div>
      <div className="soil-humidity-slider">
        <input
          type="range"
          min="-10"
          max="40"
          value={value}
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
