import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [linkedSensors, setLinkedSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [showRemoveButtons, setShowRemoveButtons] = useState(false); // Estado para mostrar/ocultar botones de eliminar

  const addLinkedSensor = async (sensorData) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Token is not defined");
    }

    try {
      const typeMapping = {
        "Temperatura": "temperature",
        "Humedad": "humidity",
        "Temperatura de terreno": "soil_temperature",
        "Humedad del terreno": "soil_humidity",
      };

      if (!sensorData.name) {
        throw new Error("sensorData.name is not defined");
      }

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
      throw error;
    }
  };

  const removeLinkedSensor = async (sensorId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Token is not defined");
    }

    try {
      await axios.delete(`http://localhost:3000/api/sensors/${sensorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLinkedSensors(linkedSensors.filter((sensor) => sensor.id !== sensorId));
    } catch (error) {
      console.error("Error al eliminar el sensor:", error);
    }
  };

  useEffect(() => {
    const fetchLinkedSensors = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:3000/api/sensors", {
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
        showRemoveButtons, // Proveer el estado al contexto
        setShowRemoveButtons, // Proveer el setter al contexto
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};
