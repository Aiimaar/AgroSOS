import "./settings-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function SettingsComponent() {
  const role = localStorage.getItem("role");  // Obtener el role del localStorage
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  const navigate = useNavigate();

  return (
    <div id="container-settings" className={darkMode ? 'dark-mode' : ''}>
      <button className="settings-arrow-container" onClick={() => navigate("/plot-list")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
        
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

        {/* Mostrar "Reglas" solo para Technician y Admin */}
        {role === "Technician" || role === "Admin" ? (
          <div className="settings-rules">
            <Link to="/rules">
              <p className="settings-p">Reglas</p>
            </Link>
          </div>
        ) : null}

        {/* Mostrar "Lista de usuarios" solo para Admin */}
        {role === "Admin" ? (
          <div className="settings-userc">
            <Link to="/admin-user-crud">
              <p className="settings-p">Lista de usuarios</p>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SettingsComponent;
