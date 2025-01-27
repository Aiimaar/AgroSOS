import React from "react";
import { Link } from "react-router-dom";
import "./plot-list-footer-comp.css";
import userProfileIcon from "./user-profile-icon.png";
import addPlotIcon from "./add-plot-icon.png";
import configIcon from "./config-icon.png";
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos

const PlotListFooterComp = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  return (
    <footer className={`plot-list-footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className="plot-list-img-container">
        <div className="plot-list-user-img-container">
          <Link to="/user-profile" className="img">
            <img src={userProfileIcon} alt="User Profile" />
          </Link>
        </div>

        <div className="plot-list-create-plot-img-container">
          <Link to="/create-plot" className="img">
            <img src={addPlotIcon} alt="Create Plot" />
          </Link>
        </div>

        <div className="plot-list-config-img-container">
          <Link to="/settings" className="img">
            <img src={configIcon} alt="Configuration" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default PlotListFooterComp;
