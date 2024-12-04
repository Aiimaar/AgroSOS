import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./actuator-enla-component.css";
import { useActuators } from "../../context/ActuatorContext";

function ActuatorEnlaComponent() {
  const { linkedActuators, deleteActuator, errors, showRemoveButtons, fetchLinkedActuators } = useActuators();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const showDeleteButton = queryParams.get("showDelete") === "true";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchLinkedActuators();
    }
  }, [navigate, fetchLinkedActuators]);

  useEffect(() => {
    if (errors === "Token inválido o caducado.") {
      navigate("/login");
    }
  }, [errors, navigate]);

  return (
    <div id="actuator-enla-container">
      <button
        className="actuator-enla-button-arrow"
        onClick={() => navigate("/actuators")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="enla-title">Actuadores enlazados</h1>
      {errors && <p className="error-message">{errors}</p>}
      <div className="linked-actuators-list">
        {linkedActuators.length === 0 ? (
          <p className="no-actuators-message">No hay actuadores enlazados.</p>
        ) : (
          linkedActuators.map((actuator) => (
            <div key={actuator.id} className="actuator-item">
              <p><strong>{actuator.type}</strong> - Código: {actuator.code}</p>
              {(showDeleteButton || showRemoveButtons) && (
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
