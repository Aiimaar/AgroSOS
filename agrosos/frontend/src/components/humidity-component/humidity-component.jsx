import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";  // Usando react-icons
import "./humidity-component.css";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { useTranslation } from "react-i18next";

function HumidityComponent() {
  const { t, i18n } = useTranslation();  // Usamos useTranslation
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
      i18n.changeLanguage(savedLanguage);  // Cambiar el idioma
    } else {
      console.log("No se encontró idioma en localStorage, usando idioma por defecto.");
      i18n.changeLanguage("es");  // En caso de no encontrar idioma, usar español por defecto
    }

    setLoading(false); // Ya no es necesario esperar por una solicitud al servidor
  }, [i18n]);

  // Verificar el idioma actual cuando cambie
  useEffect(() => {
    console.log("Idioma actual:", i18n.language); // Log para verificar el idioma actual cargado
  }, [i18n.language]);

  if (loading) {
    return <div>{t("loading")}</div>; // Mostrar mensaje de carga
  }

  const handleHumidityChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newOperator) => {
    setOperator(newOperator);
  };

  const handleApplyCondition = () => {
    const humidityCondition = {
      type: "humidity",
      value: parseInt(value),
      operator,
    };

    const existingConditions =
      JSON.parse(sessionStorage.getItem("humidityConditions")) || [];
    existingConditions.push(humidityCondition);
    sessionStorage.setItem(
      "humidityConditions",
      JSON.stringify(existingConditions)
    );
    console.log("Updated sessionStorage:", JSON.parse(sessionStorage.getItem("humidityConditions")));
    navigate(-1);
  };

  return (
    <div id="humidity-component-container" className={darkMode ? 'dark-mode' : ''} aria-labelledby="humidity-component-title">
      <div className="humidity-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="humidity-component-arrow-icon" />
      </div>
      <h1 id="humidity-component-title">{t("humidity")}</h1>
      <div className="humidity-controls" role="group" aria-labelledby="comparison-controls">
        <h2 id="comparison-controls" className="sr-only">{t("comparison_controls_label")}</h2>
        <button
          className={`humidity-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
          aria-label={t("operator_less_than")}
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
          aria-label={t("operator_equal")}
        >
          {"="}
        </button>
        <button
          className={`humidity-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
          aria-label={t("operator_greater_than")}
        >
          {">"}
        </button>
      </div>
      <div className="humidity-display" role="status" aria-live="polite" aria-label={`${t("humidity_value_label")}: ${value}%`}>
        <span className="humidity-indicator">{value}%</span>
      </div>
      <div className="humidity-slider" role="group" aria-labelledby="slider-label">
        <label htmlFor="humidity-slider" className="sr-only">{t("adjust_humidity_label")}</label>
        <input
          id="humidity-slider"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleHumidityChange}
          aria-valuenow={value}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-label={`${t("humidity_value_label")}: ${value}%`}
        />
        <div className="humidity-limits" aria-hidden="true">
          <span>-10</span>
          <span>40</span>
        </div>
      </div>
      <div className="humidity-apply">
        <button
          className="humidity-apply-button"
          onClick={handleApplyCondition}
          aria-label={t("apply_condition")}
        >
          {t("apply_condition")}
        </button>
      </div>
    </div>
  );
}

export default HumidityComponent;
