import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./soil-temperature-component.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

function SoilTemperatureComponent() {
  const { t, i18n } = useTranslation();  // Obtén las funciones de traducción
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguage = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/users/1/language", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedLanguage = response.data.language || "es";
        if (fetchedLanguage !== i18n.language) {
          i18n.changeLanguage(fetchedLanguage);
        }

      } catch (error) {
        console.log("Error fetching language:", error);
        i18n.changeLanguage("es");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
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
    <div id="soil-temperature-component-container">
      <div className="soil-temperature-component-arrow" aria-label="Regresar a la página anterior" onClick={() => navigate(-1)}>
        <FaArrowLeft className="soil-humidity-component-arrow-icon" />
      </div>
      <h1>{t("soil_temperature")}</h1>
      <div className="soil-temperature-controls" role="group" aria-labelledby="comparison-controls">
      <h2 id="comparison-controls" className="sr-only">Controles de comparación de temperatura</h2>
        <button
          className={`soil-temperature-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
          aria-pressed={operator === "<"}
        >
          {"<"}
        </button>
        <button
          className={`soil-temperature-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
          aria-pressed={operator === "="}
        >
          {"="}
        </button>
        <button
          className={`soil-temperature-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
          aria-pressed={operator === ">"}
        >
          {">"}
        </button>
      </div>
      <div className="soil-temperature-display">
        <span className="soil-temperature-indicator" aria-live="polite">
          {value}%
        </span>
      </div>
      <div className="soil-temperature-slider">
        <label htmlFor="soilTemperatureRange" className="sr-only">Ajuste de temperatura del terreno</label>
        <input
          id="soilTemperatureRange"
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleSoilTemperatureChange}
          aria-valuenow={value}
          aria-valuemin="-10"
          aria-valuemax="40"
          aria-label="Ajustar temperatura del terreno"
        />
        <div className="soil-temperature-limits">
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="soil-temperature-apply">
        <button
          className="soil-temperature-apply-button"
          onClick={handleApplyCondition}
          aria-label="Aplicar condición de temperatura"
        >
          {t("apply_condition")}
        </button>
      </div>
    </div>
  );
}

export default SoilTemperatureComponent;
