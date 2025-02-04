import "./accesibility-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "../../context/DarkModeContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AccesibilityComponent() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es"
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("Token o userId no encontrados");
      return;
    }

    i18n.changeLanguage(language);
  }, [i18n, language]);

  const handleLanguageChange = async (event) => {
    const selectedLanguage = event.target.value;
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("Token o userId no encontrados");
      return;
    }

    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);

    try {
      await axios.put(
        `${API_URL}/api/users/${userId}/language`,
        { language: selectedLanguage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Idioma actualizado en el backend:", selectedLanguage);
    } catch (error) {
      console.error(
        "Error al actualizar el idioma:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div id="container-accesibility" className={darkMode ? "dark-mode" : ""}>
      <div className="arrow-container">
        <button
          className="accesibility-arrow"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
        </button>
      </div>
      <h1 id="accesibility-title" className="accesibility-text">
        {t("accessibility")}
      </h1>
      <div className="accesibility-size">
        <p className="accesibility-p" id="text-size-label" role="note">
          {t("text_size")}
        </p>
      </div>
      <div className="accesibility-tuto" id="app-tutorial-label" role="note">
        <p className="accesibility-p">{t("tutorial")}</p>
      </div>

      <div className="accesibility-dark-mode">
        <p className="accesibility-p" onClick={toggleDarkMode}>
          {darkMode ? t("light_mode") : t("dark_mode")}
        </p>
      </div>
      <div className="language-selector">
        <label htmlFor="language-select">{t("select_language")}</label>
        <select
          id="language-select"
          onChange={handleLanguageChange}
          value={language}
        >
          <option value="es">{t("spanish")}</option>
          <option value="en">{t("english")}</option>
        </select>
      </div>
    </div>
  );
}

export default AccesibilityComponent;
