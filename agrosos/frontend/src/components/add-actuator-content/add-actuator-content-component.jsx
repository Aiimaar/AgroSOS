import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./add-actuator-content-component.css";
import lock from "./icon_lock_locked_.png";
import { useDarkMode } from '../../context/DarkModeContext';

function AddActuatorContentComponent() {
  const { t, i18n } = useTranslation();
  const { darkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const actuatorName = searchParams.get("name");
  const [actuatorCode, setActuatorCode] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const actuatorNames = {
    Riego: "Irrigation",
    Ventilación: "Ventilation",
    "Cobertura de Cultivos": "Crop Coverage",
    "Apertura de Ventanas": "Window Opening",
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "es";
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plotId = localStorage.getItem("selectedPlotId");

    if (!plotId) {
      setError(t("no_plot_selected"));
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/actuators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: actuatorNames[actuatorName] || actuatorName,
          code: Number(actuatorCode),
          plot_id: Number(plotId),
        }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || t("add_actuator_error"));
      }

      setActuatorCode("");
      setSuccessMessage(
        t("actuator_linked_success", { actuatorName, actuatorCode })
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error al agregar actuador:", error);
      setError(error.message);
    }
  };

  return (
    <div className={`container-add-actuator ${darkMode ? "dark-mode" : ""}`}>
      <div className="form-add-actuator">
        <h1 className="actuator-form-title">{t("link_actuator")}</h1>
        <form className="actuator-form" onSubmit={handleSubmit}>
          <div className="form-group-actuator-name">
            <label htmlFor="actuator-name-input" className="label-actuator-name">
              {t("actuator_name")}
            </label>
            <div className="actuator-input-container">
              <input
                type="text"
                id="actuator-name-input"
                className="input-actuator-name"
                value={actuatorName}
                readOnly
                aria-readonly="true"
                aria-label={`${t("actuator_name")}: ${actuatorName}`}
              />
              <img 
                src={lock} 
                alt={t("lock_icon")} 
                className="lock-icon" 
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="form-group-actuator-code">
            <label htmlFor="actuator-code-input" className="label-actuator-code">
              {t("actuator_code")}
            </label>
            <input
              type="number"
              id="actuator-code-input"
              className="input-actuator-code"
              placeholder={t("enter_code")}
              value={actuatorCode}
              onChange={(e) => setActuatorCode(e.target.value)}
              aria-label={t("actuator_code")}
              required
            />
          </div>
          {error && <p className="error-message" role="alert">{error}</p>}
          {successMessage && (
            <p className="actuator-success-message" role="alert">{successMessage}</p>
          )}
          <div className="add-actuator-content-buttons">
            <button type="submit" className="btn-enla" aria-label={t("link_actuator_button")}>
              {t("link")}
            </button>
            <Link to="/actuators" aria-label={t("back_to_actuators")}>
              <button className="btn-back">{t("back")}</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActuatorContentComponent;
