import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./add-rule-comp.css";
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos

const AddRuleComp = () => {
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
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  const actuatorActionMap = {
    Riego: ["Activar Riego", "Desactivar Riego"],
    Ventilación: ["Activar Ventilación", "Desactivar Ventilación"],
    "Cobertura de cultivos": [
      "Cubrir cultivos con lona semi-transparente",
      "Cubrir cultivos con lona opaca",
      "Destapar cultivos",
    ],
    "Apertura de ventanas": ["Abrir ventanas", "Cerrar ventanas"],
  };

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
          alert("No autorizado. Por favor, inicia sesión.");
          navigate("/login");
        } else {
          alert("No se pudieron cargar los cultivos.");
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
      alert("Por favor, completa todos los campos antes de añadir la regla.");
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
              value: cond.temperature,
              operator: cond.comparison,
            })),
            ...humidityConditions.map((cond) => ({
              type: "humidity",
              value: cond.humidity,
              operator: cond.comparison,
            })),
            ...soilTemperatureConditions.map((cond) => ({
              type: "soilTemperature",
              value: cond.soilTemperature,
              operator: cond.comparison,
            })),
            ...soilHumidityConditions.map((cond) => ({
              type: "soilHumidity",
              value: cond.soilHumidity,
              operator: cond.comparison,
            })),
          ],
          actions: [selectedAction],
          sensors: [{ type: sensorType }],
          actuators: [{ type: actuatorType }],
        },
      ],
    };
  
    try {
      await axios.post(
        "http://localhost:3000/api/rules",
        {
          name: ruleName,
          crop_id: cropId,
          technician_id: technicianId,
          rule_info: ruleInfo, // No es necesario stringify
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
  
      alert("Regla añadida con éxito.");
    } catch (error) {
      console.error("Error al añadir la regla:", error);
      alert("Hubo un problema al añadir la regla.");
    }
  };
  

  return (
    <div id="add-rule-container-all">
      <div className="add-rule-form-container">
        <h2 className="add-rule-form-title">Añadir Regla</h2>

        <label className="add-rule-label" htmlFor="add-rule-crop">
          Cultivo:
        </label>
        <select
          id="add-rule-crop"
          className="add-rule-select"
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
          <option value="">Selecciona un cultivo</option>
          {crops.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>

        <label className="add-rule-label" htmlFor="add-rule-sensor">
          Sensor:
        </label>
        <select
          id="add-rule-sensor"
          className="add-rule-select"
          value={sensorType}
          onChange={(e) => setSensorType(e.target.value)}
          aria-label="Selecciona un tipo de sensor"
        >
          <option value="">Selecciona un sensor</option>
          <option value="Humedad">Humedad</option>
          <option value="Temperatura">Temperatura</option>
          <option value="Humedad del terreno">Humedad del terreno</option>
          <option value="Temperatura del terreno">
            Temperatura del terreno
          </option>
        </select>

        {/* Condiciones y botones para cada tipo de sensor */}
        {sensorType === "Temperatura" && (
          <div className="add-rule-conditions">
            <h3>Condiciones de Temperatura</h3>
            <ul>
              {temperatureConditions.map((cond, index) => (
                <li key={index}>
                  {cond.operator} {cond.value}°C
                  <button
                    className="delete-condition-button"
                    onClick={() => handleDeleteCondition("temperature", index)}
                    aria-label="Eliminar condición de temperatura"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="add-rule-conditions-button"
              onClick={() => navigate("/temperature")}
              aria-label="Añadir condición de temperatura"
            >
              Añadir
            </button>
          </div>
        )}

        {sensorType === "Humedad" && (
          <div className="add-rule-conditions">
            <h3>Condiciones de Humedad</h3>
            <ul>
              {humidityConditions.map((cond, index) => (
                <li key={index}>
                  {cond.operator} {cond.value}%
                  <button
                    className="delete-condition-button"
                    onClick={() => handleDeleteCondition("humidity", index)}
                    aria-label="Eliminar condición de humedad"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="add-rule-conditions-button"
              onClick={() => navigate("/humidity")}
              aria-label="Añadir condición de humedad"
            >
              Añadir
            </button>
          </div>
        )}

        {sensorType === "Temperatura del terreno" && (
          <div className="add-rule-conditions">
            <h3>Condiciones de Temperatura del terreno</h3>
            <ul>
              {soilTemperatureConditions.map((cond, index) => (
                <li key={index}>
                  {cond.operator} {cond.value}°C
                  <button
                    className="delete-condition-button"
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
              className="add-rule-conditions-button"
              onClick={() => navigate("/soil-temperature")}
              aria-label="Añadir condición de temperatura del terreno"
            >
              Añadir
            </button>
          </div>
        )}

        {sensorType === "Humedad del terreno" && (
          <div className="add-rule-conditions">
            <h3>Condiciones de Humedad del terreno</h3>
            <ul>
              {soilHumidityConditions.map((cond, index) => (
                <li key={index}>
                  {cond.operator} {cond.value}%
                  <button
                    className="delete-condition-button"
                    onClick={() => handleDeleteCondition("soilHumidity", index)}
                    aria-label="Eliminar condición de humedad del terreno"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="add-rule-conditions-button"
              onClick={() => navigate("/soil-humidity")}
              aria-label="Añadir condición de humedad del terreno"
            >
              Añadir
            </button>
          </div>
        )}

        <label className="add-rule-label" htmlFor="add-rule-actuator">
          Actuador:
        </label>
        <select
          id="add-rule-actuator"
          className="add-rule-select"
          value={actuatorType}
          onChange={handleActuatorChange}
          aria-label="Selecciona un actuador"
        >
          <option value="">Selecciona un actuador</option>
          <option value="Riego">Riego</option>
          <option value="Ventilación">Ventilación</option>
          <option value="Cobertura de cultivos">Cobertura de cultivos</option>
          <option value="Apertura de ventanas">Apertura de ventanas</option>
        </select>

        {availableActions.length > 0 && (
          <div>
            <label className="add-rule-label" htmlFor="add-rule-actions">
              Acción:
            </label>
            <select
              id="add-rule-actions"
              className="add-rule-select"
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
          className="add-rule-form-submit-button"
          onClick={handleAddRule}
          aria-label="Añadir regla"
        >
          Añadir Regla
        </button>
      </div>
    </div>
  );
};

export default AddRuleComp;
