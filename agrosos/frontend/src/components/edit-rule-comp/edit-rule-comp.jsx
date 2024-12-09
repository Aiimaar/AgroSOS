import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edit-rule-comp.css";

const EditRuleComp = () => {
  const { ruleId } = useParams();
  const navigate = useNavigate();
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
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        alert("Autenticación requerida. Por favor, inicia sesión.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/crops", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    const fetchRule = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        alert("Autenticación requerida. Por favor, inicia sesión.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/rules/${ruleId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
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
        setTemperatureConditions(
          andConditions.conditions?.filter(
            (cond) => cond.type === "temperature"
          ) || []
        );
        setHumidityConditions(
          andConditions.conditions?.filter(
            (cond) => cond.type === "humidity"
          ) || []
        );
        setSoilTemperatureConditions(
          andConditions.conditions?.filter(
            (cond) => cond.type === "soilTemperature"
          ) || []
        );
        setSoilHumidityConditions(
          andConditions.conditions?.filter(
            (cond) => cond.type === "soilHumidity"
          ) || []
        );
      } catch (error) {
        console.error("Error fetching rule:", error);
      }
    };

    fetchCrops();
    fetchRule();
  }, [ruleId, navigate]);

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

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Autenticación requerida. Por favor, inicia sesión.");
      navigate("/login");
      return;
    }

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
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      alert("Regla actualizada con éxito.");
      navigate("/rules");
    } catch (error) {
      console.error("Error updating rule:", error);
      alert("Error al actualizar la regla.");
    }
  };

  if (!rule) return <p>Cargando...</p>;

  return (
    <div className="edit-rule-form-container">
      <h2>Editar Regla</h2>
      <label>Cultivo:</label>
      <select value={cropId} onChange={(e) => setCropId(e.target.value)}>
        <option value="">Selecciona un cultivo</option>
        {crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>

      <label>Sensor:</label>
      <select
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
        <div className="edit-rule-conditions">
          <h3>Condiciones de Temperatura</h3>
          <ul>
            {temperatureConditions.map((cond, index) => (
              <li key={index}>
                {cond.operator} {cond.value}°C
                <button
                  className="delete-condition-button"
                  onClick={() => handleDeleteCondition("temperature", index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            className="edit-rule-conditions-button"
            onClick={() => navigate("/temperature")}
          >
            Añadir
          </button>
        </div>
      )}

      {sensorType === "Humedad" && (
        <div className="edit-rule-conditions">
          <h3>Condiciones de Humedad</h3>
          <ul>
            {humidityConditions.map((cond, index) => {
              return (
                <li key={index}>
                  {cond.operator} {cond.value}%
                  <button
                    className="delete-condition-button"
                    onClick={() => handleDeleteCondition("humidity", index)}
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className="edit-rule-conditions-button"
            onClick={() => navigate("/humidity")}
          >
            Añadir
          </button>
        </div>
      )}

      {sensorType === "Temperatura del terreno" && (
        <div className="edit-rule-conditions">
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
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            className="edit-rule-conditions-button"
            onClick={() => navigate("/soil-temperature")}
          >
            Añadir
          </button>
        </div>
      )}

      {sensorType === "Humedad del terreno" && (
        <div className="edit-rule-conditions">
          <h3>Condiciones de Humedad del terreno</h3>
          <ul>
            {soilHumidityConditions.map((cond, index) => (
              <li key={index}>
                {cond.operator} {cond.value}%
                <button
                  className="delete-condition-button"
                  onClick={() => handleDeleteCondition("soilHumidity", index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            className="edit-rule-conditions-button"
            onClick={() => navigate("/soil-humidity")}
          >
            Añadir
          </button>
        </div>
      )}

      <label>Actuador:</label>
      <select value={actuatorType} onChange={handleActuatorChange}>
        <option value="">Selecciona un actuador</option>
        {Object.keys(actuatorActionMap).map((actuator) => (
          <option key={actuator} value={actuator}>
            {actuator}
          </option>
        ))}
      </select>

      <label>Acción:</label>
      <select
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

      <button className="edit-rule-update-button" onClick={handleUpdateRule}>Actualizar Regla</button>
    </div>
  );
};

export default EditRuleComp;
