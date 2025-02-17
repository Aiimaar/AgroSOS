import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next"; // <-- IMPORTANTE: importar useTranslation
import "./add-rule-comp.css";
import { useDarkMode } from "../../context/DarkModeContext";

const AddRuleComp = () => {
  const { t, i18n } = useTranslation(); // <-- IMPORTANTE: obtener t e i18n
  const [cropId, setCropId] = useState(sessionStorage.getItem("cropId") || "");
  const [crops, setCrops] = useState([]);
  const [sensorType, setSensorType] = useState(
    sessionStorage.getItem("sensorType") || ""
  );
  const [actuatorType, setActuatorType] = useState(
    sessionStorage.getItem("actuatorType") || ""
  );
  const [availableActions, setAvailableActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(
    sessionStorage.getItem("selectedAction") || ""
  );
  const [temperatureConditions, setTemperatureConditions] = useState(
    JSON.parse(sessionStorage.getItem("temperatureConditions")) || []
  );
  const [humidityConditions, setHumidityConditions] = useState(
    JSON.parse(sessionStorage.getItem("humidityConditions")) || []
  );
  const [soilTemperatureConditions, setSoilTemperatureConditions] = useState(
    JSON.parse(sessionStorage.getItem("soilTemperatureConditions")) || []
  );
  const [soilHumidityConditions, setSoilHumidityConditions] = useState(
    JSON.parse(sessionStorage.getItem("soilHumidityConditions")) || []
  );
  const [ruleNumber, setRuleNumber] = useState(1);
  const navigate = useNavigate();
  const technicianId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    i18n.changeLanguage(storedLanguage || "es"); // Usa español por defecto
  }, []);

  const actuatorActionMap = {
    Riego: [t("activate_irrigation"), t("deactivate_irrigation")],
    Ventilación: [t("activate_ventilation"), t("deactivate_ventilation")],
    "Cobertura de cultivos": [
      t("cover_crops_with_translucent_tarp"),
      t("cover_crops_with_opaque_tarp"),
      t("uncover_crops"),
    ],
    "Apertura de ventanas": [t("open_windows"), t("close_windows")],
  };

  useEffect(() => {
    // Recuperar el idioma del localStorage
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    } else {
      i18n.changeLanguage("es"); // Usar el idioma por defecto si no hay configuración previa
    }
  }, [i18n]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/crops", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
        }
      }
    };

    fetchCrops();
  }, [authToken, navigate]);

  useEffect(() => {
    sessionStorage.setItem("cropId", cropId);
    sessionStorage.setItem("sensorType", sensorType);
    sessionStorage.setItem("actuatorType", actuatorType);
    sessionStorage.setItem("selectedAction", selectedAction);
    sessionStorage.setItem(
      "temperatureConditions",
      JSON.stringify(temperatureConditions)
    );
    sessionStorage.setItem(
      "humidityConditions",
      JSON.stringify(humidityConditions)
    );
    sessionStorage.setItem(
      "soilTemperatureConditions",
      JSON.stringify(soilTemperatureConditions)
    );
    sessionStorage.setItem(
      "soilHumidityConditions",
      JSON.stringify(soilHumidityConditions)
    );
  }, [
    cropId,
    sensorType,
    actuatorType,
    selectedAction,
    temperatureConditions,
    humidityConditions,
    soilTemperatureConditions,
    soilHumidityConditions,
  ]);

  const handleActuatorChange = (e) => {
    const selectedActuator = e.target.value;
    setActuatorType(selectedActuator);

    const actions = actuatorActionMap[selectedActuator] || [];
    setAvailableActions(actions);
  };

  const handleDeleteCondition = (type, index) => {
    const updatedConditions = {
      temperature: [...temperatureConditions],
      humidity: [...humidityConditions],
      soilHumidity: [...soilHumidityConditions],
      soilTemperature: [...soilTemperatureConditions],
    };

    updatedConditions[type].splice(index, 1);

    switch (type) {
      case "temperature":
        setTemperatureConditions(updatedConditions.temperature);
        break;
      case "humidity":
        setHumidityConditions(updatedConditions.humidity);
        break;
      case "soilHumidity":
        setSoilHumidityConditions(updatedConditions.soilHumidity);
        break;
      case "soilTemperature":
        setSoilTemperatureConditions(updatedConditions.soilTemperature);
        break;
      default:
        break;
    }
  };

  const handleAddRule = async () => {
    if (
      !cropId ||
      !technicianId ||
      !sensorType ||
      !actuatorType ||
      !selectedAction
    ) {
      return;
    }

    const cropName = localStorage.getItem("cropName") || "Cultivo";
    const ruleName = `Regla ${ruleNumber} ${cropName}`;

    const ruleInfo = {
      AND: [
        {
          conditions: [
            ...temperatureConditions.map((cond) => ({
              type: "temperature",
              value: cond.value, // <-- Acceder a la propiedad 'value'
              operator: cond.operator,
            })),
            ...humidityConditions.map((cond) => ({
              type: "humidity",
              value: cond.value, // <-- Acceder a la propiedad 'value'
              operator: cond.operator,
            })),
            ...soilTemperatureConditions.map((cond) => ({
              type: "soilTemperature",
              value: cond.value, // <-- Acceder a la propiedad 'value'
              operator: cond.operator,
            })),
            ...soilHumidityConditions.map((cond) => ({
              type: "soilHumidity",
              value: cond.value, // <-- Acceder a la propiedad 'value'
              operator: cond.operator,
            })),
          ],
          actions: [selectedAction],
          sensors: [{ type: sensorType }],
          actuators: [{ type: actuatorType }],
        },
      ],
    };

    try {
      console.log("Información de la regla que se va a enviar:", {
        // <-- console.log añadido
        name: ruleName,
        crop_id: cropId,
        technician_id: technicianId,
        rule_info: JSON.stringify(ruleInfo),
      });

      await axios.post(
        "http://localhost:3000/api/rules",
        {
          name: ruleName,
          crop_id: cropId,
          technician_id: technicianId,
          rule_info: JSON.stringify(ruleInfo),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setRuleNumber(ruleNumber + 1);

      setCropId("");
      setSensorType("");
      setActuatorType("");
      setSelectedAction("");
      setTemperatureConditions([]);
      setHumidityConditions([]);
      setSoilTemperatureConditions([]);
      setSoilHumidityConditions([]);

      sessionStorage.removeItem("cropId");
      sessionStorage.removeItem("sensorType");
      sessionStorage.removeItem("actuatorType");
      sessionStorage.removeItem("selectedAction");
      sessionStorage.removeItem("temperatureConditions");
      sessionStorage.removeItem("humidityConditions");
      sessionStorage.removeItem("soilTemperatureConditions");
      sessionStorage.removeItem("soilHumidityConditions");
      localStorage.removeItem("cropName");

    } catch (error) {
      console.error("Error al añadir la regla:", error);
    }
  };

  return (
    <div className="add-rule-container-all">
    <div className={`add-rule-form-container ${darkMode ? "dark-mode" : ""}`}>
      <h2 className={`add-rule-form-title ${darkMode ? "dark-mode-text" : ""}`}>
        {t("add_rule")}
      </h2>

      <label
        className={`add-rule-label ${darkMode ? "dark-mode-text" : ""}`}
        htmlFor="add-rule-crop"
      >
        {t("crop_2")}
      </label>
      <select
        id="add-rule-crop"
        className={`add-rule-select ${darkMode ? "dark-mode-select" : ""}`}
        value={cropId}
        onChange={(e) => {
          const selectedCropId = e.target.value;
          setCropId(selectedCropId);

          const selectedCropName =
            crops.find((crop) => crop.id === Number(selectedCropId))?.name ||
            "";
          localStorage.setItem("cropName", selectedCropName);
        }}
        aria-label="Selecciona un cultivo"
      >
        <option value="">{t("select_a_crop")}</option>
        {crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>

      <label
        className={`add-rule-label ${darkMode ? "dark-mode-text" : ""}`}
        htmlFor="add-rule-sensor"
      >
        Sensor:
      </label>
      <select
        id="add-rule-sensor"
        className={`add-rule-select ${darkMode ? "dark-mode-select" : ""}`}
        value={sensorType}
        onChange={(e) => setSensorType(e.target.value)}
        aria-label="Selecciona un tipo de sensor"
      >
        <option value="">{t("select_sensor_option")}</option>
        <option value="Temperature">{t("temperature_sensor")}</option>{" "}
        {/* Valor corregido */}
        <option value="Humedad">{t("humidity_sensor")}</option>
        <option value="Temperatura del terreno">
          {t("soil_temperature_sensor")}
        </option>
        <option value="Humedad del terreno">{t("soil_humidity_sensor")}</option>
      </select>

      {/* Condiciones y botones para cada tipo de sensor */}
      {sensorType === "Temperature" && (
        <div className={`add-rule-conditions ${darkMode ? "dark-mode" : ""}`}>
          <h3 className={darkMode ? "dark-mode-text" : ""}>
            Condiciones de Temperatura
          </h3>
          <ul>
            {temperatureConditions.map((cond, index) => (
              <li key={index} className={darkMode ? "dark-mode-text" : ""}>
                {cond.operator} {cond.value}°C
                <button
                  className={`delete-condition-button ${
                    darkMode ? "dark-mode-button" : ""
                  }`}
                  onClick={() => handleDeleteCondition("temperature", index)}
                  aria-label="Eliminar condición de temperatura"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`add-rule-conditions-button ${
              darkMode ? "dark-mode-button" : ""
            }`}
            onClick={() => navigate("/temperature")}
            aria-label="Añadir condición de temperatura"
          >
            Añadir
          </button>
        </div>
      )}

      {sensorType === "Humedad" && (
        <div className={`add-rule-conditions ${darkMode ? "dark-mode" : ""}`}>
          <h3 className={darkMode ? "dark-mode-text" : ""}>
            Condiciones de Humedad
          </h3>
          <ul>
            {humidityConditions.map((cond, index) => (
              <li key={index} className={darkMode ? "dark-mode-text" : ""}>
                {cond.operator} {cond.value}%
                <button
                  className={`delete-condition-button ${
                    darkMode ? "dark-mode-button" : ""
                  }`}
                  onClick={() => handleDeleteCondition("humidity", index)}
                  aria-label="Eliminar condición de humedad"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`add-rule-conditions-button ${
              darkMode ? "dark-mode-button" : ""
            }`}
            onClick={() => navigate("/humidity")}
            aria-label="Añadir condición de humedad"
          >
            Añadir
          </button>
        </div>
      )}

      {sensorType === "Temperatura del terreno" && (
        <div className={`add-rule-conditions ${darkMode ? "dark-mode" : ""}`}>
          <h3 className={darkMode ? "dark-mode-text" : ""}>
            Condiciones de Temperatura del terreno
          </h3>
          <ul>
            {soilTemperatureConditions.map((cond, index) => (
              <li key={index} className={darkMode ? "dark-mode-text" : ""}>
                {cond.operator} {cond.value}°C
                <button
                  className={`delete-condition-button ${
                    darkMode ? "dark-mode-button" : ""
                  }`}
                  onClick={() =>
                    handleDeleteCondition("soilTemperature", index)
                  }
                  aria-label="Eliminar condición de temperatura del terreno"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`add-rule-conditions-button ${
              darkMode ? "dark-mode-button" : ""
            }`}
            onClick={() => navigate("/soil-temperature")}
            aria-label="Añadir condición de temperatura del terreno"
          >
            Añadir
          </button>
        </div>
      )}

      {sensorType === "Humedad del terreno" && (
        <div className={`add-rule-conditions ${darkMode ? "dark-mode" : ""}`}>
          <h3 className={darkMode ? "dark-mode-text" : ""}>
            Condiciones de Humedad del terreno
          </h3>
          <ul>
            {soilHumidityConditions.map((cond, index) => (
              <li key={index} className={darkMode ? "dark-mode-text" : ""}>
                {cond.operator} {cond.value}%
                <button
                  className={`delete-condition-button ${
                    darkMode ? "dark-mode-button" : ""
                  }`}
                  onClick={() => handleDeleteCondition("soilHumidity", index)}
                  aria-label="Eliminar condición de humedad del terreno"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`add-rule-conditions-button ${
              darkMode ? "dark-mode-button" : ""
            }`}
            onClick={() => navigate("/soil-humidity")}
            aria-label="Añadir condición de humedad del terreno"
          >
            Añadir
          </button>
        </div>
      )}

      <label
        className={`add-rule-label ${darkMode ? "dark-mode-text" : ""}`}
        htmlFor="add-rule-actuator"
      >
        Actuador:
      </label>
      <select
        id="add-rule-actuator"
        className={`add-rule-select ${darkMode ? "dark-mode-select" : ""}`}
        value={actuatorType}
        onChange={handleActuatorChange}
        aria-label="Selecciona un actuador"
      >
        <option value="">{t("select_actuator_option")}</option>
        <option value="Riego">{t("irrigation_actuator")}</option>
        <option value="Ventilación">{t("ventilation_actuator")}</option>
        <option value="Cobertura de cultivos">
          {t("crop_cover_actuator")}
        </option>
        <option value="Apertura de ventanas">
          {t("window_opening_actuator")}
        </option>
      </select>

      {availableActions.length > 0 && (
        <div>
          <label
            className={`add-rule-label ${darkMode ? "dark-mode-text" : ""}`}
            htmlFor="add-rule-actions"
          >
            Acción:
          </label>
          <select
            id="add-rule-actions"
            className={`add-rule-select ${darkMode ? "dark-mode-select" : ""}`}
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            aria-label="Selecciona una acción"
          >
            <option value="">Selecciona una acción</option>
            {availableActions.map((action, index) => (
              <option key={index} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        className={`add-rule-form-submit-button ${
          darkMode ? "dark-mode-button" : ""
        }`}
        onClick={handleAddRule}
        aria-label={t("add_rule_button")}
      >
        {t("add_rule_button")}
      </button>
    </div>
    </div>
  );
};

export default AddRuleComp;
