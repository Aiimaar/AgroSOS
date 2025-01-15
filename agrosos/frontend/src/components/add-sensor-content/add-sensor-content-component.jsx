import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./add-sensor-content-component.css";
import lock from "./icon_lock_locked_.png";

function AddSensor() {
    const [searchParams] = useSearchParams();
    const sensorName = searchParams.get("name");
    const [sensorCode, setSensorCode] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(""); // Estado para mensajes de éxito

    const sensorNames = {
        "Temperatura": "temperature",
        "Humedad": "humidity",
        "Temperatura de terreno": "soil_temperature",
        "Humedad del terreno": "soil_humidity"
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const plotId = localStorage.getItem("selectedPlotId");

        if (!plotId) {
            setError("No se ha seleccionado ningún terreno.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/sensors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: sensorNames[sensorName],
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
                throw new Error(errorData.message || "Error al agregar sensor");
            }
            setSensorCode("");
            setSuccessMessage(`Sensor "${sensorName}" con código "${sensorCode}" enlazado con éxito.`); //Mensaje de éxito
            setTimeout(() => setSuccessMessage(""), 5000); // Limpia el mensaje después de 5 segundos
            //navigate("/sensor-enla"); No es necesario navegar automáticamente a enlazados, ya se muestra el mensaje de éxito.
        } catch (error) {
            console.error("Error al agregar sensor:", error);
            setError(error.message);
        }
    };

    return (
        <div className="container-add-sensor">
            <div className="form-add-sensor">
                <h1 className="sensor-form-title" aria-live="polite">Enlazar sensor</h1>
                <form className="sensor-form" onSubmit={handleSubmit} aria-labelledby="sensor-form-title">
                    <div className="form-group-sensor-name">
                        <label htmlFor="sensor-name-input" className="label-sensor-name">
                            Nombre del sensor
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
                            {/* Añadido texto alternativo descriptivo */}
                            <img src={lock} alt="Icono de candado que indica que el nombre del sensor está bloqueado para edición" className="lock-icon" />
                        </div>
                        <span id="sensor-name-description" className="sr-only">
                            Este campo está bloqueado y solo muestra el nombre del sensor.
                        </span>
                    </div>
                    <div className="form-group-sensor-code">
                        <label htmlFor="sensor-code-input" className="label-sensor-code">
                            Código del sensor a enlazar
                        </label>
                        <input
                            type="number"
                            id="sensor-code-input"
                            className="input-sensor-code"
                            placeholder="Ingrese el código"
                            value={sensorCode}
                            onChange={(e) => setSensorCode(e.target.value)}
                            aria-required="true"
                            aria-invalid={error ? "true" : "false"}
                            aria-describedby="sensor-code-error"
                        />
                        {error && <p id="sensor-code-error" className="error-message">{error}</p>}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="sensor-success-message">{successMessage}</p>} {/*Muestra mensaje de éxito*/}
                    <div className="add-sensor-content-buttons">
                        <button type="submit" className="btn-enla" aria-label="Enlazar sensor">
                            Enlazar
                        </button>
                        <Link to="/sensors">
                            <button className="btn-back" aria-label="Volver a la lista de sensores">
                                Volver
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSensor;
