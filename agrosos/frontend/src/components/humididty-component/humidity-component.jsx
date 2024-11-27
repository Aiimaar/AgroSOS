import arrow from "./ArrowLeftOutlined.png";
import "./humidity-component.css";
import { useState } from "react";

function HumidityComponent() {
    const [humidity, setHumidity] = useState(23);
    const [dry, setDry] = useState(true);
    const [medium, setMedium] = useState(false);
    const [wet, setWet] = useState(false);

    const handleHumidityChange = (e) => {
        setHumidity(e.target.value);
    };

    return (
        <div id="humidity-component-container">
            <div className="humidity-component-arrow">
                <img src={arrow} alt="arrow" className="humidity-component-arrow-img" />
            </div>
            <h1>Humedad</h1>
            <div className="humidity-controls">
                <button className="humidity-button">{"<"}</button>
                <button className="humidity-button-equal">{"="}</button>
                <button className="humidity-button">{">"}</button>
            </div>
            <div className="humidity-display">
                <span>{humidity}%</span>
            </div>
            <div className="humidity-slider">
                <input type="range" min="-10" max="40" value={humidity} onChange={handleHumidityChange} />
                <div className="humidity-limits">
                    <span>-10%</span>
                    <span>40%</span>
                </div>
            </div>
            <div className="humidity-options">
                <label className="humidity-option">
                    <span>Seco (0% - 40%)</span>
                    <input 
                        type="checkbox" 
                        checked={dry} 
                        onChange={() => setDry(!dry)} 
                    />
                </label>
                <label className="humidity-option">
                    <span>Medio (40% - 70%)</span>
                    <input 
                        type="checkbox" 
                        checked={medium} 
                        onChange={() => setMedium(!medium)} 
                    />
                </label>
                <label className="humidity-option">
                    <span>Húmedo (70% - 100%)</span>
                    <input 
                        type="checkbox" 
                        checked={wet} 
                        onChange={() => setWet(!wet)} 
                    />
                </label>
            </div>
            <div className="humidity-apply">
                <button className="humidity-apply-button">Aplicar reglas</button>
            </div>
        </div>
    );
}

export default HumidityComponent;
