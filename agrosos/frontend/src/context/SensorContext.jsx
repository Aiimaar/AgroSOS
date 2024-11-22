// SensorContext.js
import React, { createContext, useState } from "react";
import axios from "axios";

export const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [linkedSensors, setLinkedSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const addLinkedSensor = async (sensorData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/sensors", sensorData);  // Verifica la URL completa
      setLinkedSensors([...linkedSensors, response.data]);
    } catch (error) {
      console.error("Error al agregar el sensor:", error);
    }
  };
  

  const removeLinkedSensor = async (sensorId) => {
    try {
      await axios.delete(`http://localhost:3000/api/sensors/${sensorId}`);  // Eliminar el sensor de la DB
      setLinkedSensors(linkedSensors.filter(sensor => sensor.id !== sensorId));
    } catch (error) {
      console.error("Error al eliminar el sensor:", error);
    }
  };

  return (
    <SensorContext.Provider value={{ linkedSensors, setLinkedSensors, selectedSensor, setSelectedSensor, addLinkedSensor, removeLinkedSensor }}>
      {children}
    </SensorContext.Provider>
  );
};
