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
      <div className="temperature-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="temperature-component-arrow-icon" />
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
          className={`temperature-button-equal ${operator === "=" ? "active" : ""}`}
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
        <input type="range" min="-10" max="40" value={value} onChange={handleTemperatureChange} />
        <div className="temperature-limits">
          <span>-10°C</span>
          <span>40°C</span>
        </div>
      </div>
      <div className="temperature-apply">
        <button className="temperature-apply-button" onClick={handleApplyCondition}>
          Aplicar condición
        </button>
      </div>
    </div>
  );
}

export default TemperatureComponent;
