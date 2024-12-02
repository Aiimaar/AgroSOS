import React, { useState, useEffect } from "react";
import axios from "axios";
import "./add-rule-comp.css"; // Importa los estilos desde el archivo CSS

const AddRuleComp = () => {
  const [cropId, setCropId] = useState(""); // ID seleccionado en el select
  const [crops, setCrops] = useState([]); // Lista de cultivos obtenida desde el backend
  const [temperatureConditions, setTemperatureConditions] = useState([]);
  const [humidityConditions, setHumidityConditions] = useState([]);
  const [actions, setActions] = useState(""); // Modificado para ser un único valor
  const [sensorTypes, setSensorTypes] = useState([]);
  const [actuatorTypes, setActuatorTypes] = useState([]);
  const technicianId = localStorage.getItem("technician_id");

  // Mapeo para traducir las opciones al enviar al backend
  const translationMap = {
    "Humedad": "Humidity",
    "Temperatura": "Temperature",
    "Humedad del terreno": "Soil Humidity",
    "Temperatura del terreno": "Soil Temperature",
    "Humedad y Temperatura": "Humidity & Temperature",
    "Temperatura y Humedad del terreno": "Temperature & Soil Humidity",
    "Temperatura y Temperatura del terreno": "Temperature & Soil Temperature",
    "Humedad del terreno y Temperatura del terreno": "Soil Humidity & Soil Temperature",
    "Riego": "Irrigation",
    "Ventilación": "Ventilation",
    "Cobertura de cultivos": "Crop Covering",
    "Apertura de ventanas": "Window Opening",
    "Riego y Ventilación": "Irrigation & Ventilation",
    "Cobertura de cultivos y Apertura de ventanas": "Crop Covering & Window Opening",
  };

  // Cargar los cultivos desde el backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/crops");
        setCrops(response.data); // Actualiza el estado con la lista de cultivos
      } catch (error) {
        console.error("Error al obtener los cultivos:", error);
        alert("No se pudieron cargar los cultivos.");
      }
    };

    fetchCrops();
  }, []);

  // Cargar datos iniciales desde localStorage
  useEffect(() => {
    const storedTempConditions =
      JSON.parse(localStorage.getItem("temperatureConditions")) || [];
    const storedHumidityConditions =
      JSON.parse(localStorage.getItem("humidityConditions")) || [];
    const storedActions = JSON.parse(localStorage.getItem("actions")) || [];

    setTemperatureConditions(storedTempConditions);
    setHumidityConditions(storedHumidityConditions);
    setActions(storedActions);
  }, []);

  const addTemperatureCondition = () => {
    window.location.href = "/temperature";
  };

  const addHumidityCondition = () => {
    window.location.href = "/humidity";
  };

  const addAction = () => {
    window.location.href = "/actions";
  };

  // Función para manejar el cambio de acción seleccionada
  const handleActionChange = (e) => {
    setActions(e.target.value); // Actualiza el estado con la acción seleccionada
  };

  const handleAddRule = async () => {
    try {
      const conditions = {
        temperature: temperatureConditions,
        humidity: humidityConditions,
      };

      // Traduce las opciones seleccionadas al inglés
      const translatedSensors = sensorTypes.map((type) => translationMap[type]);
      const translatedActuators = actuatorTypes.map((type) => translationMap[type]);

      const ruleData = {
        crop_id: cropId,
        technician_id: technicianId,
        conditions: JSON.stringify(conditions),
        actions: actions, // Guardar la acción seleccionada
        sensor_type: JSON.stringify(translatedSensors), // Guardar los sensores involucrados
        actuator_type: JSON.stringify(translatedActuators), // Guardar los actuadores involucrados
      };

      await axios.post("http://localhost:3000/api/rules", ruleData);
      alert("Regla añadida con éxito");

      // Limpia las condiciones del estado y localStorage tras añadir la regla
      setTemperatureConditions([]);
      setHumidityConditions([]);
      setActions("");
      setSensorTypes([]);
      setActuatorTypes([]);
      localStorage.removeItem("temperatureConditions");
      localStorage.removeItem("humidityConditions");
      localStorage.removeItem("actions");
    } catch (error) {
      console.error("Error al añadir la regla:", error);
      alert("Hubo un problema al añadir la regla.");
    }
  };

  return (
    <div className="add-rule-form-container">
      <h2 className="add-rule-form-title">Añadir Regla</h2>

      {/* Select para mostrar los cultivos */}
      <label htmlFor="crop" className="crop-form-label">
        Cultivo:
      </label>
      <select
        id="crop"
        value={cropId}
        onChange={(e) => setCropId(e.target.value)} // Actualiza el estado con el ID seleccionado
        className="crop-form-select"
      >
        <option value="">Selecciona un cultivo</option>
        {crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>

      <label htmlFor="temperatureConditions" className="temperature-form-label">
        Condiciones de Temperatura:
      </label>
      <button onClick={addTemperatureCondition} className="add-temp-form-button">
        Añadir
      </button>
      <ul className="temp-conditions-form-list">
        {temperatureConditions.map((condition, index) => (
          <li key={index}>
            {condition.comparison} {condition.temperature}°C
          </li>
        ))}
      </ul>

      <label htmlFor="humidityConditions" className="humidity-form-label">
        Condiciones de Humedad:
      </label>
      <button onClick={addHumidityCondition} className="add-hum-form-button">
        Añadir
      </button>
      <ul className="hum-conditions-form-list">
        {humidityConditions.map((condition, index) => (
          <li key={index}>
            {condition.comparison} {condition.humidity}%
          </li>
        ))}
      </ul>

      {/* Desplegable para seleccionar las acciones */}
      <label htmlFor="actions" className="action-form-label">
        Acciones:
      </label>
      <select
        id="actions"
        value={actions}
        onChange={handleActionChange}
        className="action-form-select"
      >
        <option value="">Selecciona una acción</option>
        <option value="Activate Irrigation">Activar riego</option>
        <option value="Deactivate Irrigation">Desactivar riego</option>
        <option value="Open Windows">Abrir ventanas</option>
        <option value="Cover Crops">Tapar cultivos</option>
        <option value="Ventilate Field">Ventilar terreno</option>
      </select>

      <label htmlFor="sensorTypes" className="sensor-form-label">
        Sensor Involucrado:
      </label>
      <select
        id="sensorTypes"
        multiple
        value={sensorTypes}
        onChange={(e) =>
          setSensorTypes(Array.from(e.target.selectedOptions, (option) => option.value))
        }
        className="sensor-form-select"
      >
        <option value="Humedad">Humedad</option>
        <option value="Temperatura">Temperatura</option>
        <option value="Humedad del terreno">Humedad del terreno</option>
        <option value="Temperatura del terreno">Temperatura del terreno</option>
        <option value="Humedad y Temperatura">Humedad y Temperatura</option>
        <option value="Temperatura y Humedad del terreno">Temperatura y Humedad del terreno</option>
        <option value="Temperatura y Temperatura del terreno">Temperatura y Temperatura del terreno</option>
        <option value="Humedad del terreno y Temperatura del terreno">Humedad del terreno y Temperatura del terreno</option>
      </select>

      <label htmlFor="actuatorTypes" className="actuator-form-label">
        Actuador Involucrado:
      </label>
      <select
        id="actuatorTypes"
        multiple
        value={actuatorTypes}
        onChange={(e) =>
          setActuatorTypes(Array.from(e.target.selectedOptions, (option) => option.value))
        }
        className="actuator-form-select"
      >
        <option value="Riego">Riego</option>
        <option value="Ventilación">Ventilación</option>
        <option value="Cobertura de cultivos">Cobertura de cultivos</option>
        <option value="Apertura de ventanas">Apertura de ventanas</option>
        <option value="Riego y Ventilación">Riego y Ventilación</option>
        <option value="Cobertura de cultivos y Apertura de ventanas">Cobertura de cultivos y Apertura de ventanas</option>
      </select>

      <button onClick={handleAddRule} className="add-rule-form-submit-button">
        Añadir Regla
      </button>
    </div>
  );
};

export default AddRuleComp;
