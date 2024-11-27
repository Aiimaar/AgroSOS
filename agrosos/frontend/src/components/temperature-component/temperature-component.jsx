import arrow from "./ArrowLeftOutlined.png";
import "./temperature-component.css";
import { useState } from "react";

function TemperatureComponent() {
    const [temperature, setTemperature] = useState(23);
    const [irrigation, setIrrigation] = useState(true);
    const [heatAlert, setHeatAlert] = useState(false);
    const [cropProtection, setCropProtection] = useState(false);

    const handleTemperatureChange = (e) => {
        setTemperature(e.target.value);
    };

    return (
        <div id="temperature-component-container">
            <div className="temperature-component-arrow">
                <img src={arrow} alt="arrow" className="temperature-component-arrow-img" />
            </div>
            <h1>Temperatura</h1>
            <div className="temperature-controls">
                <button className="temperature-button">{"<"}</button>
                <button className="temperature-button-equal">{"="}</button>
                <button className="temperature-button">{">"}</button>
            </div>
            <div className="temperature-display">
                <span className="temperature-indicator">{temperature}°C</span>
            </div>
            <div className="temperature-slider">
                <input type="range" min="-10" max="40" value={temperature} onChange={handleTemperatureChange} />
                <div className="temperature-limits">
                    <span>-10°C</span>
                    <span>40°C</span>
                </div>
            </div>
            <div className="temperature-options">
                <label className="temperature-option">
                    <span>Activar el riego</span>
                    <input 
                        type="checkbox" 
                        checked={irrigation} 
                        onChange={() => setIrrigation(!irrigation)} 
                    />
                </label>
                <label className="temperature-option">
                    <span>Alerta de calor</span>
                    <input 
                        type="checkbox" 
                        checked={heatAlert} 
                        onChange={() => setHeatAlert(!heatAlert)} 
                    />
                </label>
                <label className="temperature-option">
                    <span>Protección de cultivos</span>
                    <input 
                        type="checkbox" 
                        checked={cropProtection} 
                        onChange={() => setCropProtection(!cropProtection)} 
                    />
                </label>
            </div>
            <div className="temperature-apply">
                <button className="temperature-apply-button">Aplicar reglas</button>
            </div>
        </div>
    );
}

export default TemperatureComponent;
