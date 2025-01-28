import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

    const typeMappingInverse = {
        "temperature": "Temperatura",
        "humidity": "Humedad",
        "soil_temperature": "Temperatura de terreno",
        "soil_humidity": "Humedad del terreno"
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
                    throw new Error(errorData.message || "Error al obtener sensores");
                }

                const data = await response.json();
                setLinkedSensors(data);

            } catch (err) {
                console.error("Error al obtener sensores:", err);
                setError(err.message);
            }
        };

        fetchSensors();
    }, [navigate, token]);

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
                throw new Error(errorData.message || "Error al eliminar sensor");
            }

            setLinkedSensors(linkedSensors.filter(sensor => sensor.id !== id));
        } catch (err) {
            console.error("Error al eliminar sensor:", err);
            setError(err.message);
        }
    };

    return (
        <div id="sensor-enla-container" className={darkMode ? 'dark-mode' : ''}>
            <button
                className="sensor-enla-button-arrow"
                onClick={() => navigate("/sensors")}
                aria-label="Volver a la lista de sensores"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 id="sensor-enla-title" className="enla-title">Sensores enlazados</h1>
            {error && <p className="error-message" role="alert">{error}</p>}
            <div className="linked-sensors-list" role="list" aria-label="Lista de sensores enlazados">
                {linkedSensors.length === 0 ? (
                    <p className="no-sensors-message" role="alert">No hay sensores enlazados.</p>
                ) : (
                    linkedSensors.map((sensor) => (
                        <div
                            key={sensor.id}
                            className="sensor-item"
                            role="listitem"
                            aria-labelledby={`sensor-${sensor.id}`}
                        >
                            <p id={`sensor-${sensor.id}`}>
                                <strong>{typeMappingInverse[sensor.type] || sensor.type}</strong> - Código: {sensor.code}
                            </p>
                            {showDelete && (
                                <button
                                    onClick={() => deleteSensor(sensor.id)}
                                    className="delete-sensor-button"
                                    aria-label={`Eliminar sensor ${typeMappingInverse[sensor.type] || sensor.type} con código ${sensor.code}`}
                                >
                                    Eliminar
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
