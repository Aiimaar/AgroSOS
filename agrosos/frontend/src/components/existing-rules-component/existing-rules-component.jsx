import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClipboardList,
  faEdit,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { useTranslation } from "react-i18next"; // Importamos useTranslation para manejar los textos traducidos
import "./existing-rules-component.css";

function ExistingRulesComponent() {
  const [rules, setRules] = useState([]);
  const [crops, setCrops] = useState([]); // Estado para almacenar los cultivos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto
  const { t } = useTranslation(); // Función de traducción

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  useEffect(() => {
    // Obtener reglas
    axiosInstance
      .get("/rules")
      .then((response) => {
        setRules(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las reglas:", error);
        if (error.response && error.response.status === 401) {
          alert(t("session_expired"));
          navigate("/login");
        }
      });

    // Obtener cultivos
    axiosInstance
      .get("/crops")
      .then((response) => {
        setCrops(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los cultivos:", error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      });
  }, [t, navigate]);

  const handleEdit = (ruleId) => {
    const selectedRule = rules.find((rule) => rule.id === ruleId);
  
    if (selectedRule) {
      const ruleInfo = JSON.parse(selectedRule.rule_info);
  
      sessionStorage.setItem(
        "selectedAction",
        JSON.stringify(ruleInfo.AND?.[0]?.actions || [])
      );
      sessionStorage.setItem(
        "sensorType",
        JSON.stringify(ruleInfo.AND?.[0]?.sensors?.[0]?.type || null)
      );
      sessionStorage.setItem(
        "soilHumidityConditions",
        JSON.stringify(
          ruleInfo.AND?.[0]?.conditions?.filter(
            (cond) => cond.type === "soilHumidity"
          ) || []
        )
      );
      sessionStorage.setItem(
        "soilTemperatureConditions",
        JSON.stringify(
          ruleInfo.AND?.[0]?.conditions?.filter(
            (cond) => cond.type === "soilTemperature"
          ) || []
        )
      );
      sessionStorage.setItem(
        "temperatureConditions",
        JSON.stringify(
          ruleInfo.AND?.[0]?.conditions?.filter(
            (cond) => cond.type === "temperature"
          ) || []
        )
      );
      sessionStorage.setItem(
        "humidityConditions",
        JSON.stringify(
          ruleInfo.AND?.[0]?.conditions?.filter(
            (cond) => cond.type === "humidity"
          ) || []
        )
      );
      sessionStorage.setItem(
        "cropId",
        JSON.stringify(selectedRule.crop || null)
      );
    }
  
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

    axiosInstance
      .delete(`/rules/${ruleToDelete}`)
      .then((response) => {
        console.log(t("rule_deleted_successfully"), response.data);
        setRules((prevRules) =>
          prevRules.filter((rule) => rule.id !== ruleToDelete)
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error al eliminar la regla:", error);
        if (error.response && error.response.status === 401) {
          alert(t("session_expired"));
          navigate("/login");
        } else {
          alert(t("error_deleting_rule"));
        }
      });
  };

  const formatRuleInfo = (info) => {
    if (!info) return t("rule_info_not_available");

    try {
      const parsedInfo = JSON.parse(info);

      let formattedInfo = "";

      if (parsedInfo.AND && Array.isArray(parsedInfo.AND)) {
        parsedInfo.AND.forEach((conditionGroup) => {
          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition) => {
              if (condition.type === "temperature") {
                formattedInfo += `${t("temperature")} ${condition.operator} ${condition.value}°C`;
              }
            });
          }
          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition) => {
              if (condition.type === "humidity") {
                formattedInfo += `${t("humidity")} ${condition.operator} ${condition.value}%`;
              }
            });
          }
          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition) => {
              if (condition.type === "soilTemperature") {
                formattedInfo += `${t("soilTemperature")} ${condition.operator} ${condition.value}°C`;
              }
            });
          }
          if (conditionGroup.conditions && Array.isArray(conditionGroup.conditions)) {
            conditionGroup.conditions.forEach((condition) => {
              if (condition.type === "soilHumidity") {
                formattedInfo += `${t("soilHumidity")} ${condition.operator} ${condition.value}%`;
              }
            });
          }

          if (conditionGroup.actions && Array.isArray(conditionGroup.actions)) {
            conditionGroup.actions.forEach((action) => {
              formattedInfo += ` | ${t("action")}: ${action}`;
            });
          }

          if (conditionGroup.sensors && Array.isArray(conditionGroup.sensors)) {
            conditionGroup.sensors.forEach((sensor) => {
              formattedInfo += ` | ${t("sensor")}: ${sensor.type}`;
            });
          }

          if (conditionGroup.actuators && Array.isArray(conditionGroup.actuators)) {
            conditionGroup.actuators.forEach((actuator) => {
              formattedInfo += ` | ${t("actuator")}: ${actuator.type}`;
            });
          }
        });
      }

      return formattedInfo || t("information_not_available");
    } catch (error) {
      console.error("Error al parsear la información de la regla:", error);
      return t("invalid_rule_info");
    }
  };

  const getCropName = (rule) => {
    try {
      const ruleInfo = JSON.parse(rule.rule_info);
  
      // Obtener crop_id directamente del objeto rule, no de ruleInfo.AND
      const cropId = rule.crop_id; 
  
      if (cropId) {
        const crop = crops.find((c) => c.id === parseInt(cropId)); // Convertir cropId a entero
        return crop ? crop.name : t("unknown_crop");
      } else {
        return t("unknown_crop");
      }
    } catch (error) {
      console.error("Error al obtener el nombre del cultivo:", error);
      return t("error_getting_crop_name");
    }
  };

  return (
    <div id="existing-rules-container" className={darkMode ? "dark-mode" : ""}>
      <button
        className="existing-rule-back-button"
        onClick={() => navigate("/settings")}
        aria-label="Flecha para volver atrás"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="existing-rule-header">
        <h1 className="existing-rule-title">
          <FontAwesomeIcon icon={faClipboardList} className="icon-list" aria-hidden="true" />
          {t("rules")}
        </h1>
      </div>

      <div className="existing-rule-cards-container" role="region" aria-live="polite">
        {rules.length === 0 ? (
          <div className="no-rules-message">
            <h2>{t("no_rules_message_add")}</h2>
            <button
              className="add-rule-button"
              onClick={() => navigate("/add-rule")}
              aria-label={t("add_rule_button_label")}
            >
              <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
            </button>
          </div>
        ) : (
          rules.map((rule) => (
            <div className="existing-rule-card" key={rule.id} tabIndex="0" role="article" aria-labelledby={`rule-${rule.id}`}>
              <div className="existing-rule-card-info">
                <p>
                  <strong>{t("rule_name")}:</strong> {rule.name}
                </p>
                <p>
                  <strong>{t("crop")}:</strong> {getCropName(rule)}
                </p>
                <p>
                  <strong>{t("conditions")}:</strong> {formatRuleInfo(rule.rule_info)}
                </p>
              </div>

              <div className="existing-rule-card-actions">
                <button
                  className="existing-rule-edit-button"
                  onClick={() => handleEdit(rule.id)}
                  aria-label={t("edit_rule")}
                >
                  <FontAwesomeIcon icon={faEdit} aria-hidden="true" />
                </button>
                <button
                  className="existing-rule-delete-button"
                  onClick={() => openModal(rule.id)}
                  aria-label={t("delete_rule")}
                >
                  <FontAwesomeIcon icon={faTrashAlt} aria-hidden="true" />
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
          aria-label={t("add_rule_button_label")}
        >
          <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
        </button>
      )}

      {isModalOpen && (
        <div className="existing-rule-modal-overlay" onClick={closeModal}>
          <div
            className="existing-rule-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{t("confirm_delete_rule")}</h2>
            <div className="existing-rule-modal-buttons">
              <button
                className="existing-rule-modal-button existing-rule-modal-confirm"
                onClick={handleDelete}
              >
                {t("accept")}
              </button>
              <button
                className="existing-rule-modal-button existing-rule-modal-cancel"
                onClick={closeModal}
                aria-label={t("cancel")}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExistingRulesComponent;