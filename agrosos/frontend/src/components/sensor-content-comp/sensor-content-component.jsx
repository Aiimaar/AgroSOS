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
        <div id="sensor-content-container">
            <div className="sensorList">
                <div className="sensor-content-list">
                    <img src={airTemp} alt="Icono de sensor de temperatura del aire" className="airTemp" />
                    <p>Temperatura</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Temperatura">
                            <img src={add} alt="Icono para agregar un sensor de temperatura" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="Icono para quitar el sensor de temperatura" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list">
                    <img src={airHu} alt="Icono de sensor de humedad del aire" className="airHu" />
                    <p>Humedad</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Humedad">
                            <img src={add} alt="Icono para agregar un sensor de humedad" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="Icono para quitar el sensor de humedad" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list">
                    <img src={plotTemp} alt="Icono de sensor de temperatura del terreno" className="plotTemp" />
                    <p>Temperatura de terreno</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Temperatura%20de%20terreno">
                            <img src={add} alt="Icono para agregar un sensor de temperatura de terreno" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="Icono para quitar el sensor de temperatura del terreno" className="quit" />
                        </Link>
                    </div>
                </div>
                <div className="sensor-content-list">
                    <img src={plotHu} alt="Icono de sensor de humedad del terreno" className="plotHu" />
                    <p>Humedad del terreno</p>
                    <div className="sensor-content-buttons">
                        <Link to="/add-sensor?name=Humedad%20del%20terreno">
                            <img src={add} alt="Icono para agregar un sensor de humedad del terreno" className="add" />
                        </Link>
                        <Link to="/sensor-enla?showDelete=true">
                            <img src={quit} alt="Icono para quitar el sensor de humedad del terreno" className="quit" />
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
