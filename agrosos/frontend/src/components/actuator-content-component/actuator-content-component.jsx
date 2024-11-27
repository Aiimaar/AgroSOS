import "./actuator-content-component.css";
import vector from "./Vector.png";
import monitoringCultivation from "./image62.png";
import { Link, useNavigate } from "react-router-dom";
import irrigation from "./image59.png";
import add from "./image50.png";
import quit from "./image51.png";
import nutrition from "./image61.png";
import temp from "./Group1.png";

function ActuatorContentComponent() {
  const navigate = useNavigate();

  const actuators = [
    { name: "Actuador de riego", img: irrigation },
    { name: "Actuador de temperatura", img: temp },
    { name: "Actuador de nutrientes", img: nutrition },
    { name: "Actuador genérico", img: vector },
    { name: "Monitoreo de cultivos", img: monitoringCultivation },
  ];

  const handleQuitClick = () => {
    navigate("/actuator-enla?showDelete=true");
  };

  return (
    <div id="container">
      <div className="actuatorList">
        {actuators.map((actuator, index) => (
          <div className="list" key={index}>
            <img src={actuator.img} alt={actuator.name} className={actuator.name.toLowerCase().replace(" ", "-")} />
            <p>{actuator.name}</p>
            <div className="buttons">
              <Link to={`/add-actuator/${actuator.name}`}>
                <img src={add} alt="add" className="add" />
              </Link>
              <button onClick={handleQuitClick} className="quit-button">
                <img src={quit} alt="quit" className="quit" />
              </button>
            </div>
          </div>
        ))}
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
