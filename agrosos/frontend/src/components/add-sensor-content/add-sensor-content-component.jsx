import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./add-sensor-content-component.css";
import lock from "./icon_lock_locked_.png";
import { useDarkMode } from '../../context/DarkModeContext'; // Ajusta la ruta según tu estructura de archivos

function AddSensor() {
    const { t } = useTranslation(); // Hook de traducción
    const [searchParams] = useSearchParams();
    const sensorName = searchParams.get("name");  // Obtiene el nombre del sensor desde la URL
    const [sensorCode, setSensorCode] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const { darkMode } = useDarkMode();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const plotId = localStorage.getItem("selectedPlotId");

        if (!plotId) {
            setError(t("error_no_plot_selected"));
            return;
        }

        // --- Traducción y validación del tipo de sensor ---
        let sensorType = "";
        if (sensorName) {
             sensorType = t(sensorName, { returnObjects: true });  //Usa t() para obtener la key
        }


        if (!sensorType || typeof sensorType !== 'string') {
            setError(t("error_invalid_sensor_type")); // Mensaje de error más específico
            return;
        }
        // --- Fin de la traducción y validación ---

        try {
            const response = await fetch('http://localhost:3000/api/sensors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: sensorType,  // Usa la key traducida
                    code: Number(sensorCode),
                    plot_id: Number(plotId)
                }),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("authToken");
                    navigate("/login");
                    return;
                }
                const errorData = await response.json();
                // --- Mejor manejo de errores del servidor ---
                const errorMessage = errorData.message || t("error_linking_sensor");
                throw new Error(`${t("server_error")}: ${response.status} - ${errorMessage}`);
                // --- Fin del mejor manejo de errores ---
            }
            setSensorCode("");
            setSuccessMessage(t("sensor_linked_success", { sensorName, sensorCode }));
            setTimeout(() => setSuccessMessage(""), 5000);
        } catch (error) {
            console.error("Error al agregar sensor:", error);
            setError(error.message);
        }
    };

    return (
        <div className={`container-add-sensor ${darkMode ? 'dark-mode' : ''}`}>
            <div className="form-add-sensor">
                <h1 className="sensor-form-title" aria-live="polite">{t("link_sensor_title")}</h1>
                <form className="sensor-form" onSubmit={handleSubmit} aria-labelledby="sensor-form-title">
                    <div className="form-group-sensor-name">
                        <label htmlFor="sensor-name-input" className="label-sensor-name">
                            {t("sensor_name_label")}
                        </label>
                        <div className="sensor-input-container">
                            <input
                                type="text"
                                id="sensor-name-input"
                                className="input-sensor-name"
                                value={sensorName}
                                readOnly
                                aria-readonly="true"
                                aria-describedby="sensor-name-description"
                            />
                            <img src={lock} alt={t("sensor_name_locked_description")} className="lock-icon" />
                        </div>
                        <span id="sensor-name-description" className="sr-only">
                            {t("sensor_name_locked_description")}
                        </span>
                    </div>
                    <div className="form-group-sensor-code">
                        <label htmlFor="sensor-code-input" className="label-sensor-code">
                            {t("sensor_code_label")}
                        </label>
                        <input
                            type="number"
                            id="sensor-code-input"
                            className="input-sensor-code"
                            placeholder={t("sensor_code_placeholder")}
                            value={sensorCode}
                            onChange={(e) => setSensorCode(e.target.value)}
                            aria-required="true"
                            aria-invalid={error ? "true" : "false"}
                            aria-describedby="sensor-code-error"
                        />
                        {error && <p id="sensor-code-error" className="error-message">{error}</p>}
                    </div>
                    {successMessage && <p className="sensor-success-message">{successMessage}</p>}
                    <div className="add-sensor-content-buttons">
                        <button type="submit" className="btn-enla" aria-label={t("link_sensor_button")}>
                            {t("link_sensor_button")}
                        </button>
                        <Link to="/sensors">
                            <button className="btn-back" aria-label={t("back_to_sensors_button")}>
                                {t("back_to_sensors_button")}
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSensor;