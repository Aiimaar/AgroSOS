import React, { useContext } from "react";
import { SensorContext } from "../../context/SensorContext";
import airTemp from "./image58.png";
import airHu from "./image57.png";
import plotTemp from "./Hydroponics.png";
import plotHu from "./image56.png";
import add from "./image50.png";
import quit from "./image51.png";
import "./sensor-content-component.css";
import { Link } from "react-router-dom";

function Sensors() {
  const { setSelectedSensor, setShowRemoveButtons } = useContext(SensorContext);

  const handleAddClick = (sensorName) => {
    setSelectedSensor(sensorName);
  };

  const handleQuitClick = () => {
    setShowRemoveButtons(true); // Mostrar botones de eliminar
  };

  const handleSensorsLinkedClick = () => {
    setShowRemoveButtons(false); // Ocultar botones de eliminar
  };

  return (
    <div id="sensor-content-container">
      <div className="sensorList">
        <div className="sensor-content-list">
          <img src={airTemp} alt="airTemp" className="airTemp" />
          <p>Temperatura</p>
          <div className="sensor-content-buttons">
            <Link to="/add-sensor" onClick={() => handleAddClick("Temperatura")}>
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/sensor-enla" onClick={handleQuitClick}>
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
        <div className="sensor-content-list">
          <img src={airHu} alt="airHu" className="airHu" />
          <p>Humedad</p>
          <div className="sensor-content-buttons">
            <Link to="/add-sensor" onClick={() => handleAddClick("Humedad")}>
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/sensor-enla" onClick={handleQuitClick}>
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
        <div className="sensor-content-list">
          <img src={plotTemp} alt="plotTemp" className="plotTemp" />
          <p>Temperatura de terreno</p>
          <div className="sensor-content-buttons">
            <Link to="/add-sensor" onClick={() => handleAddClick("Temperatura de terreno")}>
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/sensor-enla" onClick={handleQuitClick}>
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
        <div className="sensor-content-list">
          <img src={plotHu} alt="plotHu" className="plotHu" />
          <p>Humedad del terreno</p>
          <div className="sensor-content-buttons">
            <Link to="/add-sensor" onClick={() => handleAddClick("Humedad del terreno")}>
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/sensor-enla" onClick={handleQuitClick}>
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
      </div>
      <div className="enla">
        <Link to="/sensor-enla" onClick={handleSensorsLinkedClick}>
          <button className="button-enla">
            <p className="enla-p">Sensores enlazados</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sensors;
