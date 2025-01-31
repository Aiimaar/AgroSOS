import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next'; // Importamos el hook useTranslation para la internacionalización
import "./sensor-enla-component.css";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function SensorEnlaComponent() {
    const [linkedSensors, setLinkedSensors] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const [searchParams] = useSearchParams();
    const showDelete = searchParams.get("showDelete") === "true";
    const [error, setError] = useState(null);
    const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto
    const { t } = useTranslation(); // Obtenemos la función t para traducir

    const typeMappingInverse = {
        "temperature": t("temperature"),
        "humidity": t("humidity"),
        "soil_temperature": t("soil_temperature"),
        "soil_humidity": t("soil_humidity")
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchSensors = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/sensors', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem("authToken");
                        navigate("/login");
                        return;
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.message || t("error_get_sensors"));
                }

                const data = await response.json();
                setLinkedSensors(data);

            } catch (err) {
                console.error(t("error_get_sensors"), err);
                setError(err.message);
            }
        };

        fetchSensors();
    }, [navigate, token, t]);

    const deleteSensor = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/sensors/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("authToken");
                    navigate("/login");
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || t("error_delete_sensor"));
            }

            setLinkedSensors(linkedSensors.filter(sensor => sensor.id !== id));
        } catch (err) {
            console.error(t("error_delete_sensor"), err);
            setError(err.message);
        }
    };

    return (
        <div id="sensor-enla-container" className={darkMode ? 'dark-mode' : ''}>
            <button
                className="sensor-enla-button-arrow"
                onClick={() => navigate("/sensors")}
                aria-label={t("back_to_sensor_list")}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 id="sensor-enla-title" className="enla-title">{t("linked_sensors")}</h1>
            {error && <p className="error-message" role="alert">{error}</p>}
            <div className="linked-sensors-list" role="list" aria-label={t("linked_sensors_list")}>
                {linkedSensors.length === 0 ? (
                    <p className="no-sensors-message" role="alert">{t("no_linked_sensors")}</p>
                ) : (
                    linkedSensors.map((sensor) => (
                        <div
                            key={sensor.id}
                            className="sensor-item"
                            role="listitem"
                            aria-labelledby={`sensor-${sensor.id}`}
                        >
                            <p id={`sensor-${sensor.id}`}>
                                <strong>{typeMappingInverse[sensor.type] || sensor.type}</strong> - {t("code")}: {sensor.code}
                            </p>
                            {showDelete && (
                                <button
                                    onClick={() => deleteSensor(sensor.id)}
                                    className="delete-sensor-button"
                                    aria-label={`${t("delete_sensor")} ${typeMappingInverse[sensor.type] || sensor.type} ${t("with_code")} ${sensor.code}`}
                                >
                                    {t("delete")}
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default SensorEnlaComponent;
