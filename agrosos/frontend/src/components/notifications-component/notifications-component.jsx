import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import alert from "./Ellipse17.png";
import { useNavigate } from "react-router-dom";
import "./notifications-component.css";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function NotificationsComponent() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  return (
    <div id="notifications-component-container" className={darkMode ? 'dark-mode' : ''}>
      <button
        className="notifications-component-button-arrow"
        onClick={() => navigate("/plot-list")}
        aria-label="Volver a la lista de parcelas"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="notifications-component-h1">Notificaciones</h1>
      <div className="notifications-component-notification">
        <img
          src={alert}
          alt="Icono de alerta, indicando que la temperatura ha superado los 30°C"
          className="notifications-component-notification-alert"
        />
        <p className="notifications-component-p">
          La temperatura ha superado los 30ºC 🔥
        </p>
      </div>
      <div className="notifications-component-notification">
        <img
          src={alert}
          alt="Icono de alerta, indicando que la humedad está por debajo del 20%"
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
