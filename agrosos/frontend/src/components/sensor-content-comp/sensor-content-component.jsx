import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sensor-content-component.css";
import airTemp from "./image58.png";
import airHu from "./image57.png";
import plotTemp from "./Hydroponics.png";
import plotHu from "./image56.png";
import add from "./image50.png";
import quit from "./image51.png";

function Sensors() {
    const [showRemoveButtons, setShowRemoveButtons] = useState(false);

    const handleQuitClick = () => {
        setShowRemoveButtons(true);
    };

    const handleSensorsLinkedClick = () => {
        setShowRemoveButtons(false);
    };

    return (
        <div id="sensor-content-container" aria-labelledby="sensor-content-title">
            <div className="sensorList" role="list" aria-label="Lista de sensores disponibles">
                <div className="sensor-content-list" role="listitem" aria-labelledby="sensor-temperature">
                    <img src={airTemp} alt="Icono de sensor de temperatura del aire" className="airTemp" />
                    <p id="sensor-temperature">Temperatura</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Temperatura" aria-label="Agregar sensor de temperatura">
                            <img src={add} alt="Agregar" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true" aria-label="Quitar sensor de temperatura">
                            <img src={quit} alt="Quitar" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list" role="listitem" aria-labelledby="sensor-humidity">
                    <img src={airHu} alt="Icono de sensor de humedad del aire" className="airHu" />
                    <p id="sensor-humidity">Humedad</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Humedad" aria-label="Agregar sensor de humedad">
                            <img src={add} alt="Agregar" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true" aria-label="Quitar sensor de humedad">
                            <img src={quit} alt="Quitar" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list" role="listitem" aria-labelledby="sensor-plot-temperature">
                    <img src={plotTemp} alt="Icono de sensor de temperatura del terreno" className="plotTemp" />
                    <p id="sensor-plot-temperature">Temperatura de terreno</p>
                    <div className="sensor-content-buttons">
                        <Link
                            to="/add-sensor?name=Temperatura%20de%20terreno"
                            aria-label="Agregar sensor de temperatura del terreno"
                        >
                            <img src={add} alt="Agregar" className="add" />
                        </Link>
                        <Link
                            to="/sensor-enla?showDelete=true"
                            aria-label="Quitar sensor de temperatura del terreno"
                        >
                            <img src={quit} alt="Quitar" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list" role="listitem" aria-labelledby="sensor-plot-humidity">
                    <img src={plotHu} alt="Icono de sensor de humedad del terreno" className="plotHu" />
                    <p id="sensor-plot-humidity">Humedad del terreno</p>
                    <div className="sensor-content-buttons">
                        <Link
                            to="/add-sensor?name=Humedad%20del%20terreno"
                            aria-label="Agregar sensor de humedad del terreno"
                        >
                            <img src={add} alt="Agregar" className="add" />
                        </Link>
                        <Link
                            to="/sensor-enla?showDelete=true"
                            aria-label="Quitar sensor de humedad del terreno"
                        >
                            <img src={quit} alt="Quitar" className="quit" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="enla">
                <Link to="/sensor-enla">
                    <button className="button-enla" aria-label="Ver sensores enlazados">
                        <p className="enla-p">Sensores enlazados</p>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Sensors;
