import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../../context/DarkModeContext";
import { useTranslation } from "react-i18next"; // Importamos useTranslation
import "./edit-rule-comp.css";

const EditRuleComp = () => {
  const { darkMode } = useDarkMode();
  const { ruleId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usamos el hook para la traducción
  const [rule, setRule] = useState(null);
  const [crops, setCrops] = useState([]);
  const [cropId, setCropId] = useState("");
  const [sensorType, setSensorType] = useState("");
  const [actuatorType, setActuatorType] = useState("");
  const [availableActions, setAvailableActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [temperatureConditions, setTemperatureConditions] = useState(() => {
    const storedConditions = sessionStorage.getItem("temperatureConditions");
    return storedConditions ? JSON.parse(storedConditions) : [];
  });

  const [humidityConditions, setHumidityConditions] = useState(() => {
    const storedConditions = sessionStorage.getItem("humidityConditions");
    return storedConditions ? JSON.parse(storedConditions) : [];
  });

  const [soilTemperatureConditions, setSoilTemperatureConditions] = useState(
    () => {
      const storedConditions = sessionStorage.getItem(
        "soilTemperatureConditions"
      );
      return storedConditions ? JSON.parse(storedConditions) : [];
    }
  );

  const [soilHumidityConditions, setSoilHumidityConditions] = useState(() => {
    const storedConditions = sessionStorage.getItem("soilHumidityConditions");
    return storedConditions ? JSON.parse(storedConditions) : [];
  });

  const actuatorActionMap = {
    Riego: [t("activate_irrigation"), t("deactivate_irrigation")],
    Ventilación: [t("activate_ventilation"), t("deactivate_ventilation")],
    "Cobertura de cultivos": [
      t("cover_crops_semi_transparent"),
      t("cover_crops_opaque"),
      t("uncover_crops"),
    ],
    "Apertura de ventanas": [t("open_windows"), t("close_windows")],
  };

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/crops", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    const fetchRule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/rules/${ruleId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const ruleData = response.data;
        const parsedRuleInfo = JSON.parse(ruleData.rule_info);
        const andConditions = parsedRuleInfo.AND?.[0] || {};

        setRule(ruleData);
        setCropId(ruleData.crop_id || "");
        setSensorType(andConditions.sensors?.[0]?.type || "");
        setActuatorType(andConditions.actuators?.[0]?.type || "");
        setSelectedAction(andConditions.actions?.[0] || "");
        setAvailableActions(
          actuatorActionMap[andConditions.actuators?.[0]?.type] || []
        );

        setTemperatureConditions(() => {
          const temp = sessionStorage.getItem("temperatureConditions");
          return temp
            ? JSON.parse(temp)
            : andConditions.conditions?.filter(
                (cond) => cond.type === "temperature"
              ) || [];
        });

        setHumidityConditions(() => {
          const hum = sessionStorage.getItem("humidityConditions");
          return hum
            ? JSON.parse(hum)
            : andConditions.conditions?.filter(
                (cond) => cond.type === "humidity"
              ) || [];
        });

        setSoilTemperatureConditions(() => {
          const sTemp = sessionStorage.getItem("soilTemperatureConditions");
          return sTemp
            ? JSON.parse(sTemp)
            : andConditions.conditions?.filter(
                (cond) => cond.type === "soilTemperature"
              ) || [];
        });

        setSoilHumidityConditions(() => {
          const sHum = sessionStorage.getItem("soilHumidityConditions");
          return sHum
            ? JSON.parse(sHum)
            : andConditions.conditions?.filter(
                (cond) => cond.type === "soilHumidity"
              ) || [];
        });
      } catch (error) {
        console.error("Error fetching rule:", error);
      }
    };

    fetchCrops();
    fetchRule();
  }, [ruleId, token]);

  const handleActuatorChange = (e) => {
    const selectedActuator = e.target.value;
    setActuatorType(selectedActuator);
    const actions = actuatorActionMap[selectedActuator] || [];
    setAvailableActions(actions);
  };

  const handleDeleteCondition = (type, index) => {
    if (type === "temperature") {
      const updatedConditions = [...temperatureConditions];
      updatedConditions.splice(index, 1);
      setTemperatureConditions(updatedConditions);
      sessionStorage.setItem(
        "temperatureConditions",
        JSON.stringify(updatedConditions)
      );
    } else if (type === "humidity") {
      const updatedConditions = [...humidityConditions];
      updatedConditions.splice(index, 1);
      setHumidityConditions(updatedConditions);
      sessionStorage.setItem(
        "humidityConditions",
        JSON.stringify(updatedConditions)
      );
    } else if (type === "soilHumidity") {
      const updatedConditions = [...soilHumidityConditions];
      updatedConditions.splice(index, 1);
      setSoilHumidityConditions(updatedConditions);
      sessionStorage.setItem(
        "soilHumidityConditions",
        JSON.stringify(updatedConditions)
      );
    } else if (type === "soilTemperature") {
      const updatedConditions = [...soilTemperatureConditions];
      updatedConditions.splice(index, 1);
      setSoilTemperatureConditions(updatedConditions);
      sessionStorage.setItem(
        "soilTemperatureConditions",
        JSON.stringify(updatedConditions)
      );
    }
  };

  const handleUpdateRule = async () => {
    const updatedRuleInfo = {
      AND: [
        {
          conditions: [
            ...temperatureConditions,
            ...humidityConditions,
            ...soilTemperatureConditions,
            ...soilHumidityConditions,
          ],
          actions: [selectedAction],
          sensors: [{ type: sensorType }],
          actuators: [{ type: actuatorType }],
        },
      ],
    };

    try {
      await axios.put(
        `http://localhost:3000/api/rules/${ruleId}`,
        {
          name: rule.name,
          crop_id: cropId,
          technician_id: rule.technician_id,
          rule_info: JSON.stringify(updatedRuleInfo),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(t("rule_updated_successfully"));
      navigate("/rules");
    } catch (error) {
      console.error("Error updating rule:", error);
      alert(t("error_updating_rule"));
    }
  };

  if (!rule) return <p className={darkMode ? 'dark-mode' : ''}>{t('loading')}</p>;

  return (
    <div className={`edit-rule-form-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>{t('edit_rule')}</h2>
      <label htmlFor="cropId">{t('crop')}:</label>
      <select
        id="cropId"
        value={cropId}
        onChange={(e) => setCropId(e.target.value)}
        aria-label={t('select_crop')}
      >
        <option value="">{t('select_crop_option')}</option>
        {crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>

      <label htmlFor="sensorType">{t('sensor')}:</label>
      <select
        id="sensorType"
        value={sensorType}
        onChange={(e) => setSensorType(e.target.value)}
        aria-label={t('select_sensor')}
      >
        <option value="">{t('select_sensor_option')}</option>
        <option value="Humedad">{t('humidity')}</option>
        <option value="Temperatura">{t('temperature')}</option>
        <option value="Humedad del terreno">{t('soil_humidity')}</option>
        <option value="Temperatura del terreno">{t('soil_temperature')}</option>
      </select>

      {/* Condiciones de sensor */}
      {sensorType === "Temperatura" && (
        <div className="edit-rule-conditions">
          <h3>{t('temperature_conditions')}</h3>
          <ul>
            {temperatureConditions.map((cond, index) => (
              <li key={index}>
                {cond.operator} {cond.value}°C
                <button
                  className="delete-condition-button"
                  onClick={() => handleDeleteCondition("temperature", index)}
                  aria-label={`${t('delete_condition')} ${cond.operator} ${cond.value}°C`}
                >
                  {t('delete')}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="edit-rule-conditions-button"
            onClick={() => navigate("/temperature")}
            aria-label={t('add_temperature_condition')}
          >
            {t('add')}
          </button>
        </div>
      )}

      {sensorType === "Humedad" && (
        <div className="edit-rule-conditions">
          <h3>{t('humidity_conditions')}</h3>
          <ul>
            {humidityConditions.map((cond, index) => (
              <li key={index}>
                {cond.operator} {cond.value}%
                <button
                  className="delete-condition-button"
                  onClick={() => handleDeleteCondition("humidity", index)}
                  aria-label={`${t('delete_condition')} ${cond.operator} ${cond.value}%`}
                >
                  {t('delete')}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="edit-rule-conditions-button"
            onClick={() => navigate("/humidity")}
            aria-label={t('add_humidity_condition')}
          >
            {t('add')}
          </button>
        </div>
      )}

      <label htmlFor="actuatorType">{t('actuator')}:</label>
      <select
        id="actuatorType"
        value={actuatorType}
        onChange={handleActuatorChange}
        aria-label={t('select_actuator')}
      >
        <option value="">{t('select_actuator_option')}</option>
        {Object.keys(actuatorActionMap).map((actuator) => (
          <option key={actuator} value={actuator}>
            {actuator}
          </option>
        ))}
      </select>

      <label htmlFor="selectedAction">{t('action')}:</label>
      <select
        id="selectedAction"
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value)}
        aria-label={t('select_action')}
      >
        <option value="">{t('select_action_option')}</option>
        {availableActions.map((action, index) => (
          <option key={index} value={action}>
            {action}
          </option>
        ))}
      </select>

      <button
        className="edit-rule-update-button"
        onClick={handleUpdateRule}
        aria-label={t('update_rule')}
      >
        {t('update_rule')}
      </button>
    </div>
  );
};

export default EditRuleComp;
