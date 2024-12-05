import { useNavigate, useLocation } from 'react-router-dom';
import arrow from "./ArrowLeftOutlined.png";
import "./temperature-component.css";
import { useState } from "react";

function TemperatureComponent() {
    const [temperature, setTemperature] = useState(23);
    const [comparison, setComparison] = useState("="); // Para <, =, >
    const navigate = useNavigate();
    const location = useLocation();

    const handleTemperatureChange = (e) => {
        setTemperature(e.target.value);
    };

    const handleComparisonChange = (newComparison) => {
        setComparison(newComparison);
    };

    const handleApplyCondition = () => {
        // Crear el objeto de condición de temperatura
        const temperatureCondition = {
            temperature,
            comparison,
        };

        // Guardar en localStorage
        const existingConditions = JSON.parse(localStorage.getItem("temperatureConditions")) || [];
        existingConditions.push(temperatureCondition);
        localStorage.setItem("temperatureConditions", JSON.stringify(existingConditions));

        // Después de guardar en localStorage, navegar hacia atrás
        navigate(-1);
    };

    return (
        <div id="temperature-component-container">
            <div className="temperature-component-arrow">
                <img src={arrow} alt="arrow" className="temperature-component-arrow-img" />
            </div>
            <h1>Temperatura</h1>
            <div className="temperature-controls">
                <button
                    className={`temperature-button ${comparison === "<" ? "active" : ""}`}
                    onClick={() => handleComparisonChange("<")}
                >
                    {"<"}
                </button>
                <button
                    className={`temperature-button-equal ${comparison === "=" ? "active" : ""}`}
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
            <div className="temperature-display">
                <span className="temperature-indicator">{temperature}°C</span>
            </div>
            <div className="temperature-slider">
                <input
                    type="range"
                    min="-10"
                    max="40"
                    value={temperature}
                    onChange={handleTemperatureChange}
                />
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
