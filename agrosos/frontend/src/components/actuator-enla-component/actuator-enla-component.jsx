import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./actuator-enla-component.css";

function ActuatorEnlaComponent() {
    const [linkedActuators, setLinkedActuators] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const [searchParams] = useSearchParams(); 
    const showDelete = searchParams.get("showDelete") === "true"; 
    const [error, setError] = useState(null); 

    const actuatorTranslations = {
        "Irrigation": "Riego",
        "Ventilation": "Ventilación",
        "Crop Coverage": "Cobertura de Cultivos", 
        "Window Opening": "Apertura de Ventanas" 
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return; 
        }

        const fetchActuators = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/actuators', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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
                    throw new Error(errorData.message || "Error al obtener actuadores");
                }

                const data = await response.json();
                setLinkedActuators(data);
            } catch (err) {
                console.error("Error al obtener actuadores:", err);
                setError(err.message); 
            }
        };

        fetchActuators();
    }, [navigate, token]); 

    const deleteActuator = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/actuators/${id}`, {
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
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al eliminar actuador")
            }

            setLinkedActuators(linkedActuators.filter(actuator => actuator.id !== id));
        } catch (err) {
            console.error("Error al eliminar actuador:", err);
            setError(err.message); 
        }
    };

    return (
        <div id="actuator-enla-container">
            <button
                className="actuator-enla-button-arrow"
                onClick={() => navigate("/actuators")}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 className="enla-title">Actuadores enlazados</h1>
            {error && <p className="error-message">{error}</p>} 
            <div className="linked-actuators-list">
                {linkedActuators.length === 0 ? (
                    <p className="no-actuators-message">No hay actuadores enlazados.</p>
                ) : (
                    linkedActuators.map((actuator) => (
                        <div key={actuator.id} className="actuator-item">
                            <p>
                                <strong>{actuatorTranslations[actuator.type] || actuator.type}</strong> - Código: {actuator.code} 
                            </p>
                            {showDelete && ( 
                                <button
                                    onClick={() => deleteActuator(actuator.id)}
                                    className="delete-actuator-button"
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

export default ActuatorEnlaComponent;