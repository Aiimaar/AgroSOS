import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"; 
import "./actuator-enla-component.css";
import { useDarkMode } from "../../context/DarkModeContext"; 

function ActuatorEnlaComponent() {
    const [linkedActuators, setLinkedActuators] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const [searchParams] = useSearchParams();
    const showDelete = searchParams.get("showDelete") === "true";
    const [error, setError] = useState(null);
    const { darkMode } = useDarkMode();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") || "es"; 
        i18n.changeLanguage(storedLanguage);
    }, [i18n]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchActuators = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/actuators", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        localStorage.removeItem("authToken");
                        navigate("/login");
                        return;
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.message || t("fetch_error"));
                }

                const data = await response.json();
                setLinkedActuators(data);
            } catch (err) {
                console.error(t("fetch_error"), err);
                setError(err.message);
            }
        };

        fetchActuators();
    }, [navigate, token, t]);

    const deleteActuator = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/actuators/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("authToken");
                    navigate("/login");
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || t("delete_error"));
            }

            setLinkedActuators(linkedActuators.filter((actuator) => actuator.id !== id));
        } catch (err) {
            console.error(t("delete_error"), err);
            setError(err.message);
        }
    };

    return (
        <div id="actuator-enla-container" className={darkMode ? "dark-mode" : ""}>
            <button
                className="actuator-enla-button-arrow"
                onClick={() => navigate("/actuators")}
                aria-label={t("back_to_actuators")}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 id="actuator-enla-title" className="enla-title">
                {t("linked_actuators")}
            </h1>
            {error && (
                <p className="error-message" role="alert" aria-live="assertive">
                    {error}
                </p>
            )}
            <div className="linked-actuators-list">
                {linkedActuators.length === 0 ? (
                    <p className="no-actuators-message">{t("no_actuators")}</p>
                ) : (
                    linkedActuators.map((actuator) => (
                        <div key={actuator.id} className="actuator-item" role="listitem">
                            <p>
                                <strong>{t(`actuators.${actuator.type}`)}</strong> - {t("code")}: {actuator.code}
                            </p>
                            {showDelete && (
                                <button
                                    onClick={() => deleteActuator(actuator.id)}
                                    className="delete-actuator-button"
                                    aria-label={`${t("delete_actuator")} ${t(`actuators.${actuator.type}`)}`}
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

export default ActuatorEnlaComponent;
