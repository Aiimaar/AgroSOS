import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./add-rule-comp.css";

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
  const [ruleNumber, setRuleNumber] = useState(1); // State for rule number
  const navigate = useNavigate();
  const technicianId = localStorage.getItem("userId");

  const actuatorActionMap = {
    Riego: ["Activar Riego", "Desactivar Riego"],
    Ventilación: ["Activar Ventilación", "Desactivar Ventilación"],
    "Cobertura de cultivos": ["Cubrir cultivos con lona semi-transparente", "Cubrir cultivos con lona opaca", "Destapar cultivos"],
    "Apertura de ventanas": ["Abrir ventanas", "Cerrar ventanas"],
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchLinkedActuators();
    }
  }, [navigate, fetchLinkedActuators]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/crops");
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
        alert("No se pudieron cargar los cultivos.");
      }
    };
    console.log(crops);
console.log(typeof cropId);
    fetchCrops();
  }, []);

  useEffect(() => {
    // Store state in sessionStorage whenever it changes
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
    if (type === "temperature") {
      const updatedConditions = [...temperatureConditions];
      updatedConditions.splice(index, 1);
      setTemperatureConditions(updatedConditions);
    } else if (type === "humidity") {
      const updatedConditions = [...humidityConditions];
      updatedConditions.splice(index, 1);
      setHumidityConditions(updatedConditions);
    } else if (type === "soilHumidity") {
      const updatedConditions = [...soilHumidityConditions];
      updatedConditions.splice(index, 1);
      setSoilHumidityConditions(updatedConditions);
    } else if (type === "soilTemperature") {
      const updatedConditions = [...soilTemperatureConditions];
      updatedConditions.splice(index, 1);
      setSoilTemperatureConditions(updatedConditions);
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

    const cropName = crops.find((crop) => crop.id === Number(cropId))?.name || "Cultivo";
    console.log(cropName)
    const ruleName = Regla ${ruleNumber} ${cropName};


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
      await axios.post("http://localhost:3000/api/rules", {
        name: ruleName,
        crop_id: cropId,
        technician_id: technicianId,
        rule_info: JSON.stringify(ruleInfo),
      });

      // Increment the rule number for the next rule
      setRuleNumber(ruleNumber + 1);

      setCropId("");
      setSensorType("");
      setActuatorType("");
      setSelectedAction("");
      setTemperatureConditions([]);
      setHumidityConditions([]);
      setSoilTemperatureConditions([]);
      setSoilHumidityConditions([]);

      // Limpiar sessionStorage
      sessionStorage.removeItem("cropId");
      sessionStorage.removeItem("sensorType");
      sessionStorage.removeItem("actuatorType");
      sessionStorage.removeItem("selectedAction");
      sessionStorage.removeItem("temperatureConditions");
      sessionStorage.removeItem("humidityConditions");
      sessionStorage.removeItem("soilTemperatureConditions");
      sessionStorage.removeItem("soilHumidityConditions");

      alert("Regla añadida con éxito.");
    } catch (error) {
      console.error("Error al añadir la regla:", error);
      alert("Hubo un problema al añadir la regla.");
    }
  };

  return (
    <div className="add-rule-form-container">
      <h2 className="add-rule-form-title">Añadir Regla</h2>

      <label className="add-rule-label" htmlFor="add-rule-crop">
        Cultivo:
      </label>
      <select
        id="add-rule-crop"
        className="add-rule-select"
        value={cropId}
        onChange={(e) => setCropId(e.target.value)}
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
      >
        <option value="">Selecciona un sensor</option>
        <option value="Humedad">Humedad</option>
        <option value="Temperatura">Temperatura</option>
        <option value="Humedad del terreno">Humedad del terreno</option>
        <option value="Temperatura del terreno">Temperatura del terreno</option>
      </select>

      {sensorType === "Temperatura" && (
        <div className="add-rule-conditions">
          <h3>Condiciones de Temperatura</h3>
          <ul>
            {temperatureConditions.map((cond, index) => (
              <li key={index}>
                {cond.operator} {cond.value}°C
                <button className="delete-condition-button"
                  onClick={() => handleDeleteCondition("temperature", index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button className="add-rule-conditions-button" onClick={() => navigate("/temperature")}>
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
                <button className="delete-condition-button"
                  onClick={() => handleDeleteCondition("humidity", index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button className="add-rule-conditions-button" onClick={() => navigate("/humidity")}>
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
                <button className="delete-condition-button"
                  onClick={() => handleDeleteCondition("soilTemperature", index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button className="add-rule-conditions-button" onClick={() => navigate("/soil-temperature")}>
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
                <button className="delete-condition-button"
                  onClick={() => handleDeleteCondition("soilHumidity", index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button className="add-rule-conditions-button" onClick={() => navigate("/soil-humidity")}>
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

      <button className="add-rule-form-submit-button" onClick={handleAddRule}>
        Añadir Regla
      </button>
    </div>
  );
};

export default AddRuleComp;