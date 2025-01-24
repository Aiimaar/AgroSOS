import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./humidity-component.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

function HumidityComponent() {
  const { t, i18n } = useTranslation();  // Usamos useTranslation
  const [value, setValue] = useState(23);
  const [operator, setOperator] = useState("=");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch language preference from the server
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
    <div id="humidity-component-container">
      <div className="humidity-component-arrow" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="humidity-component-arrow-icon" />
      </div>
      <h1>{t('humidity')}</h1>  {/* Reemplazamos el texto estático por la traducción */}
      <div className="humidity-controls">
        <button
          className={`humidity-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {t('operator_less_than')}  {/* Reemplazamos los operadores */}
        </button>
        <button
          className={`humidity-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
        >
          {t('operator_equal')}
        </button>
        <button
          className={`humidity-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
        >
          {t('operator_greater_than')}
        </button>
      </div>
      <div className="humidity-display">
        <span className="humidity-indicator">{value}%</span>
      </div>
      <div className="humidity-slider">
        <input
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleHumidityChange}
        />
        <div className="humidity-limits">
          <span>{t('min_humidity')}</span>  {/* Reemplazamos los límites de humedad */}
          <span>{t('max_humidity')}</span>
        </div>
      </div>
      <div className="humidity-apply">
        <button className="humidity-apply-button" onClick={handleApplyCondition}>
          {t('apply_condition')}  {/* Reemplazamos el texto de aplicar condición */}
        </button>
      </div>
    </div>
  );
}

export default HumidityComponent;
