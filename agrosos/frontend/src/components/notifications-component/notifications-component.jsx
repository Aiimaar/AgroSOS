import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import alert from "./Ellipse17.png";
import { useNavigate } from "react-router-dom";
import "./notifications-component.css";

function NotificationsComponent() {
  const navigate = useNavigate();
  return (
    <div id="notifications-component-container">
      <button
        className="notifications-component-button-arrow"
        onClick={() => navigate("/plot-list")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="notifications-component-h1">Notificaciones</h1>
      <div className="notifications-component-notification">
        <img
          src={alert}
          alt="alert"
          className="notifications-component-notification-alert"
        />
        <p className="notifications-component-p">
          La temperatura ha superado los 30ºC 🔥
        </p>
      </div>
      <div className="notifications-component-notification">
        <img
          src={alert}
          alt="alert"
          className="notifications-component-notification-alert"
        />
        <p className="notifications-component-p">
          La humedad está por debajo del 20%. Se recomienda el riego 💧
        </p>
      </div>
      <div className="notifications-component-notification">
        <p className="notifications-component-p">El terreno está muy húmedo</p>
      </div>
      <div className="notifications-component-notification">
        <p className="notifications-component-p">
          La temperatura ha descendido peligrosamente
        </p>
      </div>
      <div className="notifications-component-notification">
        <p className="notifications-component-p">
          La temperatura del aire es baja
        </p>
      </div>
    </div>
  );
}

export default NotificationsComponent;
