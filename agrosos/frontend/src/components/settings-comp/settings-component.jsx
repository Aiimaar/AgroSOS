import "./settings-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SettingsComponent() {
  const role = localStorage.getItem("role"); // Obtener el role del localStorage
  const navigate = useNavigate();

  return (
    <div id="container-settings" aria-labelledby="settings-title">
      <button
        className="settings-arrow-container"
        onClick={() => navigate("/plot-list")}
        aria-label="Volver a la lista de terrenos"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 id="settings-title" className="settings-text">Ajustes</h1>
      <div className="settings-container-elements">
        <Link to="/notifications" aria-label="Ir a Alertas y notificaciones">
          <div className="settings-noti">
            <p className="settings-p">Alertas y notificaciones</p>
          </div>
        </Link>
        <div
          className="settings-export"
          role="region"
          aria-labelledby="export-settings-title"
        >
          <p id="export-settings-title" className="settings-p">Exportar terrenos</p>
          <div className="settings-ex" aria-label="Opciones de exportación de terrenos">
            <p className="settings-subp">CSV</p>
            <p className="settings-sub" aria-hidden="true">|</p>
            <p className="settings-subp">Excel</p>
          </div>
        </div>
        <div
          className="settings-actu"
          role="button"
          tabIndex="0"
          aria-label="Verificar actualizaciones"
        >
          <p className="settings-p">Verificar Actualizaciones</p>
        </div>
        <div
          className="settings-help"
          role="button"
          tabIndex="0"
          aria-label="Ayuda y soporte"
        >
          <p className="settings-p">Ayuda y soporte</p>
        </div>

        {/* Mostrar "Reglas" solo para Technician y Admin */}
        {role === "Technician" || role === "Admin" ? (
          <div className="settings-rules">
            <Link to="/rules" aria-label="Ir a Reglas">
              <p className="settings-p">Reglas</p>
            </Link>
          </div>
        ) : null}

        {/* Mostrar "Lista de usuarios" solo para Admin */}
        {role === "Admin" ? (
          <div className="settings-userc">
            <Link to="/admin-user-crud" aria-label="Ir a Lista de usuarios">
              <p className="settings-p">Lista de usuarios</p>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SettingsComponent;
