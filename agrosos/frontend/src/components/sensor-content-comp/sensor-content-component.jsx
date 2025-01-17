import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sensor-content-component.css";
import airTemp from "./image58.png";
import airHu from "./image57.png";
import plotTemp from "./Hydroponics.png";
import plotHu from "./image56.png";
import add from "./image50.png";
import quit from "./image51.png";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function Sensors() {
    const [showRemoveButtons, setShowRemoveButtons] = useState(false);
    const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

    const handleQuitClick = () => {
        setShowRemoveButtons(true);
    };

    const handleSensorsLinkedClick = () => {
        setShowRemoveButtons(false);
    };

    return (
        <div id="sensor-content-container" className={darkMode ? 'dark-mode' : ''}>
            <div className="sensorList">
                <div className="sensor-content-list">
                    <img src={airTemp} alt="airTemp" className="airTemp" />
                    <p>Temperatura</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Temperatura">
                            <img src={add} alt="add" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="quit" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list">
                    <img src={airHu} alt="airHu" className="airHu" />
                    <p>Humedad</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Humedad">
                            <img src={add} alt="add" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="quit" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list">
                    <img src={plotTemp} alt="plotTemp" className="plotTemp" />
                    <p>Temperatura de terreno</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Temperatura%20de%20terreno"> {/* Codificación del espacio */}
                            <img src={add} alt="add" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="quit" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list">
                    <img src={plotHu} alt="plotHu" className="plotHu" />
                    <p>Humedad del terreno</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Humedad%20del%20terreno"> {/* Codificación del espacio */}
                            <img src={add} alt="add" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="quit" className="quit" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="enla">
                <Link to="/sensor-enla">
                    <button className="button-enla">
                        <p className="enla-p">Sensores enlazados</p>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Sensors;
