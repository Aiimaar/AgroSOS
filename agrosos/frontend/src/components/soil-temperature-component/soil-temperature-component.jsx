import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./soil-temperature-component.css";
import { useTranslation } from "react-i18next";

function SoilTemperatureComponent() {
  const { t, i18n } = useTranslation(); // Obtén las funciones de traducción
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSoilTemperatureChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setOperator(newComparison);
  };

  const handleApplyCondition = () => {
    const soilTemperatureCondition = {
      type: "soilTemperature",
      value: parseInt(value),
      operator,
    };

    const existingConditions =
      JSON.parse(sessionStorage.getItem("soilTemperatureConditions")) || [];
    existingConditions.push(soilTemperatureCondition);
    sessionStorage.setItem(
      "soilTemperatureConditions",
      JSON.stringify(existingConditions)
    );
    navigate(-1);
  };

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div id="soil-temperature-component-container" aria-labelledby="soil-temperature-title" role="region">
      <div className="soil-temperature-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="soil-temperature-component-arrow-icon" role="button" tabIndex="0" aria-label={t("comparison_less_than")} />
      </div>
      <h1 id="soil-temperature-title">{t("soil_temperature")}</h1>
      <div className="soil-temperature-controls" role="group" aria-labelledby="comparison-buttons-title">
        <button
          className={`soil-temperature-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
          aria-label={t("comparison_less_than")}
        >
          {"<"}
        </button>
        <button
          className={`temperature-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
          aria-label={t("comparison_equal")}
        >
          {"="}
        </button>
        <button
          className={`temperature-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
          aria-label={t("comparison_greater_than")}
        >
          {">"}
        </button>
      </div>
      <div
        className="soil-temperature-display"
        role="status"
        aria-live="polite"
        aria-label={`${t("soil_temperature_value_label")}: ${value}°C`}
      >
        <span className="soil-temperature-indicator">{value}°C</span>
      </div>
      <div
        className="soil-temperature-slider"
        role="group"
        aria-labelledby="slider-label"
      >
        <input
          id="soil-temperature-range"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleSoilTemperatureChange}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-valuenow={value}
          aria-label={`${t("soil_temperature_range_label")}: ${value}°C`}
        />
        <div
          className="soil-temperature-limits"
          aria-hidden="true"
        >
          <span>-10°C</span>
          <span>40°C</span>
        </div>
      </div>
      <div className="soil-temperature-apply">
        <button
          className="soil-temperature-apply-button"
          onClick={handleApplyCondition}
          aria-label={t("apply_condition")}
        >
          {t("apply_condition")}
        </button>
      </div>
    </div>
  );
}

export default SoilTemperatureComponent;
