import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faBell,
  faBook,
  faLightbulb,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./header.css";
import { useDarkMode } from "../../context/DarkModeContext"; // Ajusta la ruta si es necesario
import { useTranslation } from "react-i18next"; // Importa el hook

function Header() {
  const { t, i18n } = useTranslation(); // Accede a 'i18n' para cambiar el idioma
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Aseguramos que el idioma se configure correctamente al inicio
  useEffect(() => {
    // Si no hay idioma en localStorage, establece uno predeterminado
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (isMenuOpen && !event.target.closest(".side-menu")) {
      closeMenu();
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Cambia el idioma globalmente
    localStorage.setItem("language", lang); // Guarda el idioma en el localStorage
  };

  return (
    <div
      className={`app-container ${darkMode ? "dark-mode" : ""}`}
      onClick={handleOutsideClick}
    >
      <header className="header">
        <Link to={"/plot-list"}>
          <img src={logo} alt="Logo Planta" className="plant-icon" />
        </Link>
        <button className="header-menu-button" onClick={openMenu}>
          <FontAwesomeIcon icon={faBars} size="2xl" />
        </button>
        <nav className="header-desktop-menu" aria-label={t("mainMenu")}>
          <ul>
            <li>
              <Link to="/plot-list" aria-label={t("goToHomePage")}>
                <FontAwesomeIcon icon={faHome} />
                <span>{t("home")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/accesibility"
                aria-label={t("goToAccessibilityPage")}
              >
                <FontAwesomeIcon icon={faUniversalAccess} />
                <span>{t("accessibility")}</span>
              </Link>
            </li>
            <li>
              <Link to="/advices" aria-label={t("goToAdvicesPage")}>
                <FontAwesomeIcon icon={faLightbulb} />
                <span>{t("advices")}</span>
              </Link>
            </li>
            <li>
              <Link to="/notifications" aria-label={t("goToNotificationsPage")}>
                <FontAwesomeIcon icon={faBell} />
                <span>{t("notifications")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/terms-conditions"
                aria-label={t("goToTermsConditionsPage")}
              >
                <FontAwesomeIcon icon={faBook} />
                <span>{t("terms_and_conditions")}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <button onClick={toggleDarkMode} className="toggle-dark-mode">
        {darkMode ? t("deactivateDarkMode") : t("activateDarkMode")}
      </button>

      {/* Botón para cambiar el idioma */}
      <button onClick={() => handleLanguageChange("es")}>Español</button>
      <button onClick={() => handleLanguageChange("en")}>English</button>

      <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

function SideMenu({ isOpen, onClose }) {
  const { t } = useTranslation(); // Hook para traducciones

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <button
        className="side-close-button"
        onClick={onClose}
        aria-label={t("closeMenu")}
      >
        <FontAwesomeIcon icon={faTimes} size="2xl" />
      </button>
      <ul className="side-menu-items">
        <li>
          <Link
            to="/plot-list"
            onClick={onClose}
            aria-label={t("goToHomePage")}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>{t("home")}</span>
          </Link>
        </li>
        <li>
          <Link
            to="/notifications"
            onClick={onClose}
            aria-label={t("goToNotificationsPage")}
          >
            <FontAwesomeIcon icon={faBell} />
            <span>{t("notifications")}</span>
          </Link>
        </li>
        <li>
          <Link to="/accesibility" onClick={onClose}>
            <FontAwesomeIcon icon={faUniversalAccess} />
            <span>{t("accessibility")}</span>
          </Link>
        </li>
        <li>
          <Link
            to="/advices"
            onClick={onClose}
            aria-label={t("goToAdvicesPage")}
          >
            <FontAwesomeIcon icon={faLightbulb} />
            <span>{t("advices")}</span>
          </Link>
        </li>
        <li>
          <Link
            to="/terms-conditions"
            onClick={onClose}
            aria-label={t("goToTermsConditionsPage")}
          >
            <FontAwesomeIcon icon={faBook} />
            <span>{t("terms_and_conditions")}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
