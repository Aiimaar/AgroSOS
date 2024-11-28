import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faHome, faBell, faBook, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./side-menu-comp.css";

function SideMenuComp({ isOpen, onClose }) {
  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button className="side-close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} size="2xl" />
      </button>
      <ul className="side-menu-items">
        <li>
          <Link to="/plot-list" onClick={onClose}>
            <FontAwesomeIcon icon={faHome} />
            <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" onClick={onClose}>
            <FontAwesomeIcon icon={faBell} />
            <span>Notificaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/advices" onClick={onClose}>
            <FontAwesomeIcon icon={faLightbulb} />
            <span>Consejos</span>
          </Link>
        </li>
        <li>
          <Link to="/terms-conditions" onClick={onClose}>
            <FontAwesomeIcon icon={faBook} />
            <span>Términos y condiciones</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideMenuComp;
