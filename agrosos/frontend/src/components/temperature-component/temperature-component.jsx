import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./temperature-component.css";
import { useDarkMode } from "../../context/DarkModeContext";
import { useTranslation } from "react-i18next";

function TemperatureComponent() {
  const { t, i18n } = useTranslation(); // Usamos t para las traducciones y i18n para obtener el idioma
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");  // Obtener el idioma desde localStorage

    if (savedLanguage) {
      console.log("Idioma recuperado desde localStorage:", savedLanguage); // Log para verificar el idioma
      i18n.changeLanguage(savedLanguage);  // Cambiar el idioma usando i18n
    } else {
      console.log("No se encontró idioma en localStorage, usando idioma por defecto.");
      i18n.changeLanguage("es");  // Si no hay idioma en localStorage, usamos el idioma por defecto (español)
    }

    setLoading(false);  // Ya no es necesario esperar por una solicitud al servidor
  }, [i18n]);

  // Verificar el idioma que está activo antes de que se renderice el componente
  useEffect(() => {
    console.log("Idioma actual:", i18n.language); // Log para verificar el idioma actual cargado
  }, [i18n.language]);

  if (loading) {
    return <div>{t("loading")}</div>; // Mostrar mensaje de carga mientras se espera la respuesta
  }

  const handleTemperatureChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setOperator(newComparison);
  };

  const handleApplyCondition = () => {
    const temperatureCondition = {
      type: "temperature",
      value: parseInt(value),
      operator,
    };
    const existingConditions = JSON.parse(sessionStorage.getItem("temperatureConditions")) || [];
    existingConditions.push(temperatureCondition);
    sessionStorage.setItem("temperatureConditions", JSON.stringify(existingConditions));
    navigate(-1);
  };

  return (
    <div id="temperature-component-container" className={darkMode ? 'dark-mode' : ''}>
      <div className="temperature-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="temperature-component-arrow-icon" />
      </div>
      <h1 id="temperature-heading">{t("temperature")}</h1> {/* Traducción para el título de temperatura */}
      <div className="temperature-controls" role="group" aria-labelledby="comparison-controls">
        <button
          className={`temperature-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
        >
          {"<"}
        </button>
        <button
          className={`temperature-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
        >
          {"="}
        </button>
        <button
          className={`temperature-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
        >
          {">"}
        </button>
      </div>
      <div className="temperature-display" role="status" aria-live="polite" aria-label={`${t("temperature_value_label")}: ${value}°C`}>
        <span className="temperature-indicator">{value}°C</span> {/* Traducción para el valor de temperatura */}
      </div>
      <div className="temperature-slider" role="group" aria-labelledby="slider-label">
        <label htmlFor="temperatureRange" className="sr-only">{t("adjust_temperature_label")}</label> {/* Traducción para ajustar temperatura */}
        <input
          id="temperatureRange"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleTemperatureChange}
          aria-valuenow={value}
          aria-valuemin="-10"
          aria-valuemax="40"
        />
      </div>
      <div className="temperature-apply">
        <button
          className="temperature-apply-button"
          onClick={handleApplyCondition}
        >
          {t("apply_condition")} {/* Traducción para el botón de aplicar condición */}
        </button>
      </div>
    </div>
  );
}

export default TemperatureComponent;
