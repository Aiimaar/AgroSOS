import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [linkedSensors, setLinkedSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
  const navigate = useNavigate();

  const addLinkedSensor = async (sensorData) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
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
      navigate("/login");
      return;
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
    const token = localStorage.getItem("authToken");

    const fetchLinkedSensors = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/sensors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLinkedSensors(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Error al obtener los sensores enlazados:", error);
        }
      }
    };

    // Interceptor de errores globales de Axios
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    fetchLinkedSensors();

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <SensorContext.Provider
      value={{
        linkedSensors,
        setLinkedSensors,
        selectedSensor,
        setSelectedSensor,
        addLinkedSensor,
        removeLinkedSensor,
        showRemoveButtons,
        setShowRemoveButtons,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};
