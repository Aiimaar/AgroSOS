import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./soil-humidity-component.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

function SoilHumidityComponent() {
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
    <div id="soil-humidity-component-container">
      <div className="soil-humidity-component-arrow" onClick={() => navigate(-1)}>
        <FaArrowLeft className="soil-humidity-component-arrow-icon" />
      </div>
      <h1>{t("soil_humidity")}</h1>
      <div className="soil-humidity-controls">
        <button
          className={`soil-humidity-button ${operator === "<" ? "active" : ""}`}
          onClick={() => handleComparisonChange("<")}
        >
          {"<"}
        </button>
        <button
          className={`humidity-button-equal ${operator === "=" ? "active" : ""}`}
          onClick={() => handleComparisonChange("=")}
        >
          {"="}
        </button>
        <button
          className={`humidity-button ${operator === ">" ? "active" : ""}`}
          onClick={() => handleComparisonChange(">")}
        >
          {">"}
        </button>
      </div>
      <div className="soil-humidity-display">
        <span className="soil-humidity-indicator">{value}%</span>
      </div>
      <div className="soil-humidity-slider">
        <input
          type="range"
          min="-10"
          max="40"
          value={value}
          onChange={handleSoilHumidityChange}
        />
        <div className="soil-humidity-limits">
          <span>-10%</span>
          <span>40%</span>
        </div>
      </div>
      <div className="soil-humidity-apply">
        <button
          className="soil-humidity-apply-button"
          onClick={handleApplyCondition}
        >
          {t("apply_condition")}
        </button>
      </div>
    </div>
  );
}

export default SoilHumidityComponent;
