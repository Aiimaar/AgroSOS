import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClipboardList, faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./existing-rules-component.css";

function ExistingRulesComponent() {
  const [rules, setRules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/rules")
      .then((response) => {
        setRules(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las reglas:", error);
      });
  }, []);

  const handleEdit = (ruleId) => {
    // Encuentra la regla que será editada
    const selectedRule = rules.find((rule) => rule.id === ruleId);
  
    if (selectedRule) {
      const ruleInfo = JSON.parse(selectedRule.rule_info);
  
      sessionStorage.setItem("selectedAction", JSON.stringify(ruleInfo.AND?.[0]?.actions || []));
      sessionStorage.setItem("sensorType", JSON.stringify(ruleInfo.AND?.[0]?.sensors?.[0]?.type || null));
      sessionStorage.setItem("soilHumidityConditions", JSON.stringify(ruleInfo.AND?.[0]?.conditions?.filter(cond => cond.type === "soilHumidity") || []));
      sessionStorage.setItem("soilTemperatureConditions", JSON.stringify(ruleInfo.AND?.[0]?.conditions?.filter(cond => cond.type === "soilTemperature") || []));
      sessionStorage.setItem("temperatureConditions", JSON.stringify(ruleInfo.AND?.[0]?.conditions?.filter(cond => cond.type === "temperature") || []));
      sessionStorage.setItem("humidityConditions", JSON.stringify(ruleInfo.AND?.[0]?.conditions?.filter(cond => cond.type === "humidity") || []));
      sessionStorage.setItem("cropId", JSON.stringify(selectedRule.crop || null));
    }
  
    // Navegar a la página de edición
    navigate(`/edit-rule/${ruleId}`);
  };

  const openModal = (ruleId) => {
    setRuleToDelete(ruleId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRuleToDelete(null);
  };

  const handleDelete = () => {
    if (!ruleToDelete) return;

    axios.delete(`http://localhost:3000/api/rules/${ruleToDelete}`)
      .then((response) => {
        console.log("Regla eliminada con éxito:", response.data);
        setRules((prevRules) => prevRules.filter((rule) => rule.id !== ruleToDelete));
        closeModal();
      })
      .catch((error) => {
        console.error("Error al eliminar la regla:", error);
        alert("Hubo un problema al eliminar la regla. Intenta nuevamente.");
      });
  };

  const formatRuleInfo = (info) => {
    if (!info) return null;
  
    try {
      const parsedInfo = JSON.parse(info);
  
      let formattedInfo = "";
  
      if (parsedInfo.AND && Array.isArray(parsedInfo.AND)) {
        parsedInfo.AND.forEach((conditionGroup, index) => {
          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition, conditionIndex) => {
              if (condition.type === "temperature") {
                formattedInfo += `Temperatura ${condition.operator} ${condition.value}°C`;
              }
            });
          }

          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition, conditionIndex) => {
              if (condition.type === "humidity") {
                formattedInfo += `Humedad ${condition.operator} ${condition.value}%`;
              }
            });
          }

          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition, conditionIndex) => {
              if (condition.type === "soilTemperature") {
                formattedInfo += `Temperatura del terreno ${condition.operator} ${condition.value}°C`;
              }
            });
          }

          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition, conditionIndex) => {
              if (condition.type === "soilHumidity") {
                formattedInfo += `Humedad del terreno ${condition.operator} ${condition.value}%`;
              }
            });
          }
  
          if (conditionGroup.actions && Array.isArray(conditionGroup.actions)) {
            conditionGroup.actions.forEach((action, actionIndex) => {
              formattedInfo += ` | Acción: ${action}`;
            });
          }
  
          if (conditionGroup.sensors && Array.isArray(conditionGroup.sensors)) {
            conditionGroup.sensors.forEach((sensor, sensorIndex) => {
              formattedInfo += ` | Sensor: ${sensor.type}`;
            });
          }
  
          if (conditionGroup.actuators && Array.isArray(conditionGroup.actuators)) {
            conditionGroup.actuators.forEach((actuator, actuatorIndex) => {
              formattedInfo += ` | Actuador: ${actuator.type}`;
            });
          }
        });
      }
  
      return formattedInfo || "Información no disponible";
    } catch (error) {
      console.error("Error al parsear la información de la regla:", error);
      return "Información no válida";
    }
  };

  return (
    <div id="existing-rules-container">
      <button className="existing-rule-back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="existing-rule-header">
        <h1 className="existing-rule-title">
          <FontAwesomeIcon icon={faClipboardList} className="icon-list" />
          Reglas
        </h1>
      </div>

      <div className="existing-rule-cards-container">
        {rules.length === 0 ? (
          <div className="no-rules-message">
            <h2>Añadir regla</h2>
            <button
              className="add-rule-button"
              onClick={() => navigate("/add-rule")}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        ) : (
          rules.map((rule) => (
            <div className="existing-rule-card" key={rule.id}>
              <div className="existing-rule-card-info">
                <p><strong>Nombre:</strong> {rule.name}</p>
                <p><strong>Cultivo:</strong> {rule.crop}</p>
                <p><strong>Condiciones:</strong> {formatRuleInfo(rule.rule_info)}</p>
              </div>

              <div className="existing-rule-card-actions">
                <button
                  className="existing-rule-edit-button"
                  onClick={() => handleEdit(rule.id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="existing-rule-delete-button"
                  onClick={() => openModal(rule.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {rules.length > 0 && (
        <button
          className="add-rule-button-circle"
          onClick={() => navigate("/add-rule")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}

      {isModalOpen && (
        <div className="existing-rule-modal-overlay" onClick={closeModal}>
          <div className="existing-rule-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>¿Estás seguro de que deseas eliminar esta regla?</h2>
            <div className="existing-rule-modal-buttons">
              <button className="existing-rule-modal-button existing-rule-modal-confirm" onClick={handleDelete}>Aceptar</button>
              <button className="existing-rule-modal-button existing-rule-modal-cancel" onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExistingRulesComponent;
