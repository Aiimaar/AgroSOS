import React from "react";
import { Link } from "react-router-dom";
import "./plot-list-footer-comp.css";
import userProfileIcon from "./user-profile-icon.png";
import addPlotIcon from "./add-plot-icon.png";
import configIcon from "./config-icon.png";

const PlotListFooterComp = () => {
  return (
    <footer className="plot-list-footer">
        <div className="plot-list-img-container">
            <div className="plot-list-user-img-container">
                <Link to="/user-profile" className="img">
                    <img src={userProfileIcon} alt="Icono de perfil de usuario. Redirige al perfil del usuario." />
                </Link>
            </div>

            <div className="plot-list-create-plot-img-container">
                <Link to="/create-plot" className="img">
                    <img src={addPlotIcon} alt="Icono para crear una nueva parcela. Redirige al formulario de creación de parcela." />
                </Link>
            </div>

            <div className="plot-list-config-img-container">
                <Link to="/settings" className="img">
                    <img src={configIcon} alt="Icono de configuración. Redirige a la página de configuración." />
                </Link>
            </div>
        </div>
    </footer>
  );
};

export default PlotListFooterComp;
