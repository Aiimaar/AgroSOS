import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./soil-humidity-component.css";
import { useTranslation } from "react-i18next";

function SoilHumidityComponent() {
  const { t, i18n } = useTranslation();  // Obtén las funciones de traducción
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");  // Obtener el idioma desde localStorage

    if (savedLanguage) {
      console.log("Idioma recuperado desde localStorage:", savedLanguage);  // Log para verificar el idioma
      i18n.changeLanguage(savedLanguage);  // Cambiar el idioma
    } else {
      console.log("No se encontró idioma en localStorage, usando idioma por defecto.");
      i18n.changeLanguage("es");  // En caso de no encontrar idioma, usar español por defecto
    }

    setLoading(false); // Ya no es necesario esperar por una solicitud al servidor
  }, [i18n]);

  const handleSoilHumidityChange = (e) => {
    setValue(e.target.value);
  };

  const handleComparisonChange = (newComparison) => {
    setOperator(newComparison);
  };

  const handleApplyCondition = () => {
    const soilHumidityCondition = {
      type: "soilHumidity",
      value: parseInt(value),
      operator,
    };

    const existingConditions =
      JSON.parse(sessionStorage.getItem("soilHumidityConditions")) || [];
    existingConditions.push(soilHumidityCondition);
    sessionStorage.setItem(
      "soilHumidityConditions",
      JSON.stringify(existingConditions)
    );
    navigate(-1);
  };

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div id="soil-humidity-component-container" aria-labelledby="soil-humidity-title" role="region">
      <div className="soil-humidity-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="soil-humidity-component-arrow-icon" role="button" tabIndex="0" aria-label={t("comparison_less_than")} />
      </div>
      <h1 id="soil-humidity-title">{t("soil_humidity")}</h1>
      <div className="soil-humidity-controls" role="group" aria-labelledby="comparison-buttons-title">
        <button
          className={`soil-humidity-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
          aria-label={t("comparison_less_than")}
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
          aria-label={t("comparison_equal")}
        >
          {"="}
        </button>
        <button
          className={`humidity-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
          aria-label={t("comparison_greater_than")}
        >
          {">"}
        </button>
      </div>
      <div
        className="soil-humidity-display"
        role="status"
        aria-live="polite"
        aria-label={`${t("soil_humidity_value_label")}: ${value}%`}
      >
        <span className="soil-humidity-indicator">{value}%</span>
      </div>
      <div
        className="soil-humidity-slider"
        role="group"
        aria-labelledby="slider-label"
      >
        <input
          id="soil-humidity-range"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleSoilHumidityChange}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-valuenow={value}
          aria-label={`${t("soil_humidity_value_label")}: ${value}%`}
        />
        <div
          className="soil-humidity-limits"
          aria-hidden="true"
        >
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="soil-humidity-apply">
        <button
          className="soil-humidity-apply-button"
          onClick={handleApplyCondition}
          aria-label={t("apply_condition")}
        >
          {t("apply_condition")}
        </button>
      </div>
    </div>
  );
}

export default SoilHumidityComponent;
