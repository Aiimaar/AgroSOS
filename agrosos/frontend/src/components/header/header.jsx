import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faBell, faBook, faLightbulb, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (isMenuOpen && !event.target.closest('.side-menu')) {
      closeMenu();
    }
  };

  return (
    <div className="app-container" onClick={handleOutsideClick}>
      <header className="header">
        <img src={logo} alt="Logo de la aplicación Planta" className="plant-icon" />
        <button 
          className="header-menu-button" 
          onClick={openMenu}
          aria-label="Abrir el menú de navegación"
        >
          <FontAwesomeIcon icon={faBars} size="2xl" />
        </button>
        <div className="header-desktop-menu">
          <ul>
            <li>
              <Link to="/plot-list" aria-label="Ir a la página de inicio">
                <FontAwesomeIcon icon={faHome} />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/accesibility" aria-label="Acceder a la página de accesibilidad">
                <FontAwesomeIcon icon={faUniversalAccess} />
                <span>Accesibilidad</span>
              </Link>
            </li>
            <li>
              <Link to="/advices" aria-label="Ir a la sección de consejos">
                <FontAwesomeIcon icon={faLightbulb} />
                <span>Consejos</span>
              </Link>
            </li>
            <li>
              <Link to="/notifications" aria-label="Ir a la sección de notificaciones">
                <FontAwesomeIcon icon={faBell} />
                <span>Notificaciones</span>
              </Link>
            </li>
            <li>
              <Link to="/terms-conditions" aria-label="Ir a los términos y condiciones">
                <FontAwesomeIcon icon={faBook} />
                <span>Términos y condiciones</span>
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

function SideMenu({ isOpen, onClose }) {
  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button 
        className="side-close-button" 
        onClick={onClose} 
        aria-label="Cerrar el menú lateral"
      >
        <FontAwesomeIcon icon={faTimes} size="2xl" />
      </button>
      <ul className="side-menu-items">
        <li>
          <Link to="/plot-list" onClick={onClose} aria-label="Ir a la página de inicio">
            <FontAwesomeIcon icon={faHome} />
            <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" onClick={onClose} aria-label="Ir a la sección de notificaciones">
            <FontAwesomeIcon icon={faBell} />
            <span>Notificaciones</span>
          </Link>
        </li>
        <li>
          <Link to="/advices" onClick={onClose} aria-label="Ir a la sección de consejos">
            <FontAwesomeIcon icon={faLightbulb} />
            <span>Consejos</span>
          </Link>
        </li>
        <li>
          <Link to="/terms-conditions" onClick={onClose} aria-label="Ir a los términos y condiciones">
            <FontAwesomeIcon icon={faBook} />
            <span>Términos y condiciones</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
