import "./settings-component.css";
import arrow from "./ArrowLeftOutlined.png";
import { Link } from "react-router-dom";

function SettingsComponent() {
  return (
    <div id="container-settings">
      <div className="settings-arrow-container">
        <Link to="/plot-list">
          <img src={arrow} alt="arrow" className="settings-arrow" />
        </Link>
      </div>
      <h1 className="settings-text">Ajustes</h1>
      <div className="settings-container-elements">
        <Link to="/notifications">
          <div className="settings-noti">
            <p className="settings-p">Alertas y notificaciones</p>
          </div>
        </Link>
        <div className="settings-export">
          <p className="settings-p">Exportar terrenos</p>
          <div className="settings-ex">
            <p className="settings-subp">CSV</p>
            <p className="settings-sub">|</p>
            <p className="settings-subp">Excel</p>
          </div>
        </div>
        <div className="settings-actu">
          <p className="settings-p">Verificar Actualizaciones</p>
        </div>
        <div className="settings-help">
          <p className="settings-p">Ayuda y soporte</p>
        </div>
        <div className="settings-rules">
          <Link to="/rules">
            <p className="settings-p">Reglas</p>
          </Link>
        </div>
        <div className="settings-userc">
          <Link to="/admin-user-crud">
            <p className="settings-p">Lista de usuarios</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SettingsComponent;
