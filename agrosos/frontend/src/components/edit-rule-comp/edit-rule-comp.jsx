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
    const storedConditions = localStorage.getItem("temperatureConditions");
    return storedConditions ? JSON.parse(storedConditions) : [];
  });
  
  const [humidityConditions, setHumidityConditions] = useState(() => {
    const storedConditions = localStorage.getItem("humidityConditions");
    return storedConditions ? JSON.parse(storedConditions) : [];
  });
  
  const [soilTemperatureConditions, setSoilTemperatureConditions] = useState(() => {
    const storedConditions = localStorage.getItem("soilTemperatureConditions");
    return storedConditions ? JSON.parse(storedConditions) : [];
  });
  
  const [soilHumidityConditions, setSoilHumidityConditions] = useState(() => {
    const storedConditions = localStorage.getItem("soilHumidityConditions");
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
    console.log("Humidity conditions from localStorage:", JSON.parse(localStorage.getItem("humidityConditions")));
  }, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/crops");
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    const fetchRule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/rules/${ruleId}`
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
  }, [ruleId]);

  // useEffect(() => {
  //   // Store state in localStorage whenever it changes
  //   localStorage.setItem("cropId", cropId);
  //   localStorage.setItem("sensorType", sensorType);
  //   localStorage.setItem("actuatorType", actuatorType);
  //   localStorage.setItem("selectedAction", selectedAction);
  //   localStorage.setItem(
  //     "temperatureConditions",
  //     JSON.stringify(temperatureConditions)
  //   );
  //   localStorage.setItem(
  //     "humidityConditions",
  //     JSON.stringify(humidityConditions)
  //   );
  //   localStorage.setItem(
  //     "soilTemperatureConditions",
  //     JSON.stringify(soilTemperatureConditions)
  //   );
  //   localStorage.setItem(
  //     "soilHumidityConditions",
  //     JSON.stringify(soilHumidityConditions)
  //   );
  // }, [
  //   cropId,
  //   sensorType,
  //   actuatorType,
  //   selectedAction,
  //   temperatureConditions,
  //   humidityConditions,
  //   soilTemperatureConditions,
  //   soilHumidityConditions,
  // ]);

  useEffect(() => {
    const storedConditions = localStorage.getItem("humidityConditions");
    if (storedConditions) {
      setHumidityConditions(JSON.parse(storedConditions)); // Parse y set al estado
    } else {
      setHumidityConditions([]); // Por defecto vacío
    }
  }, []);

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
      await axios.put(`http://localhost:3000/api/rules/${ruleId}`, {
        name: rule.name,
        crop_id: cropId,
        technician_id: rule.technician_id,
        rule_info: JSON.stringify(updatedRuleInfo),
      });

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
                {cond.comparison} {cond.temperature}°C
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
              console.log("Rendering condition:", cond);
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
                {cond.comparison} {cond.soilHumidity}%
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
      
      <button onClick={handleUpdateRule}>Actualizar Regla</button>
    </div>
  );
};

export default EditRuleComp;
