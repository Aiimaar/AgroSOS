import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./temperature-component.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

function TemperatureComponent() {
  const { t, i18n } = useTranslation(); // Usamos useTranslation
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch language preference from the server (similar to how it's done in SettingsComponent)
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

        const fetchedLanguage = response.data.language || "es"; // Por defecto "es"
        if (fetchedLanguage !== i18n.language) {
          i18n.changeLanguage(fetchedLanguage); // Cambiar el idioma si es necesario
        }
      } catch (error) {
        console.log("Error fetching language:", error);
        i18n.changeLanguage("es"); // Establecer idioma por defecto si falla la carga
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [i18n]);

  if (loading) {
    return <div>{t("loading")}</div>; // Mostrar mensaje de carga
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
    <div id="temperature-component-container">
      <div className="temperature-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="temperature-component-arrow-icon" />
      </div>
      <h1>{t('temperature')}</h1>  {/* Usamos la traducción de 'temperature' */}
      <div className="temperature-controls">
        <button
          className={`temperature-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {t('operator_less_than')}  {/* Traducido con 'operator_less_than' */}
        </button>
        <button
          className={`temperature-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
        >
          {t('operator_equal')}  {/* Traducido con 'operator_equal' */}
        </button>
        <button
          className={`temperature-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
        >
          {t('operator_greater_than')}  {/* Traducido con 'operator_greater_than' */}
        </button>
      </div>
      <div className="temperature-display">
        <span className="temperature-indicator">{value}°C</span>
      </div>
      <div className="temperature-slider">
        <input type="range" min="-10" max="40" value={value} onChange={handleTemperatureChange} />
        <div className="temperature-limits">
          <span>{t('min_temp')}</span>  {/* Traducido con 'min_temp' */}
          <span>{t('max_temp')}</span>  {/* Traducido con 'max_temp' */}
        </div>
      </div>
      <div className="temperature-apply">
        <button className="temperature-apply-button" onClick={handleApplyCondition}>
          {t('apply_condition')}  {/* Traducido con 'apply_condition' */}
        </button>
      </div>
    </div>
  );
}

export default TemperatureComponent;
