import React, { createContext, useState, useEffect } from "react"; // Asegúrate de importar useEffect
import axios from "axios";

export const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [linkedSensors, setLinkedSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const addLinkedSensor = async (sensorData) => {
    try {
      const typeMapping = {
        "Temperatura del aire": "temperature",
        "Humedad del aire": "humidity",
        "Temperatura del terreno": "soil_temperature",
        "Humedad del terreno": "soil_humidity",
        "Radiación solar": "solar_radiation",
      };

      const transformedData = {
        ...sensorData,
        type: typeMapping[sensorData.name] || sensorData.name.toLowerCase(),
      };

      const response = await axios.post("http://localhost:3000/api/sensors/", transformedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinkedSensors([...linkedSensors, response.data]);
    } catch (error) {
      console.error("Error al agregar el sensor:", error);
    }
  };

  const removeLinkedSensor = async (sensorId) => {
    try {
      await axios.delete(`http://localhost:3000/api/sensors/${sensorId}`);
      setLinkedSensors(linkedSensors.filter((sensor) => sensor.id !== sensorId));
    } catch (error) {
      console.error("Error al eliminar el sensor:", error);
    }
  };

  // Nueva función para obtener los sensores al cargar
  useEffect(() => {
    const fetchLinkedSensors = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:3000/api/sensors",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLinkedSensors(response.data);
      } catch (error) {
        console.error("Error al obtener los sensores enlazados:", error);
      }
    };

    fetchLinkedSensors();
  }, []);

  return (
    <SensorContext.Provider
      value={{
        linkedSensors,
        setLinkedSensors,
        selectedSensor,
        setSelectedSensor,
        addLinkedSensor,
        removeLinkedSensor,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};
