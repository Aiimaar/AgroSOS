import "./actuator-content-component.css";
import vector from "./Vector.png";
import monitoringCultivation from "./image62.png";
import { Link } from "react-router-dom";
import irrigation from "./image59.png";
import add from "./image50.png";
import quit from "./image51.png";
import nutrition from "./image61.png";
import temp from "./Group1.png";

function ActuatorContentComponent() {
  return (
    <div id="container">
      <div className="actuatorList">
        <div className="list">
          <img src={irrigation} alt="irrigation" className="irrigation" />
          <p>Actuador de riego</p>
          <div className="buttons">
            <Link to="/add-actuator">
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/actuator-enla">
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
        <div className="list">
          <img src={temp} alt="temp" className="temp" />
          <p>Actuador de temperatura</p>
          <div className="buttons">
            <Link to="/add-actuator">
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/actuator-enla">
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
        <div className="list">
          <img src={nutrition} alt="nutrition" className="nutrition" />
          <p>Actuador de nutrientes</p>
          <div className="buttons">
            <Link to="/add-actuator">
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/actuator-enla">
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
        <div className="list">
          <img src={vector} alt="vector" className="vector" />
          <p>Actuador genérico</p>
          <div className="buttons">
            <Link to="/add-actuator">
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/actuator-enla">
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
        <div className="list">
          <img
            src={monitoringCultivation}
            alt="monitoringCultivation"
            className="monitoringCultivation"
          />
          <p>Monitoreo de cultivos</p>
          <div className="buttons">
            <Link to="/add-actuator">
              <img src={add} alt="add" className="add" />
            </Link>
            <Link to="/actuator-enla">
              <img src={quit} alt="quit" className="quit" />
            </Link>
          </div>
        </div>
      </div>
      <div className="enla">
        <button className="button-enla">
          <Link to="/actuator-enla">
            <p className="enla-p">Actuadores enlazados</p>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ActuatorContentComponent;
