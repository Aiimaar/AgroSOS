import React, { createContext, useState, useContext, useEffect } from "react";

export const ActuatorContext = createContext();

export const ActuatorProvider = ({ children }) => {
  const [actuators, setActuators] = useState([]);
  const [selectedActuator, setSelectedActuator] = useState("");
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [linkedActuators, setLinkedActuators] = useState([]);
  const [tokenError, setTokenError] = useState("");

  const translationMap = {
    "Riego": "Irrigation",
    "Ventilación": "Ventilation",
    "Cobertura de cultivos": "Crop coverage",
    "Apertura de ventanas": "Window opening"
  };

  const reverseTranslationMap = {
    "Irrigation": "Riego",
    "Ventilation": "Ventilación",
    "Crop coverage": "Cobertura de cultivos",
    "Window opening": "Apertura de ventanas"
  };

  const translateActuator = (actuator) => {
    return reverseTranslationMap[actuator] || actuator;
  };

  const fetchLinkedActuators = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setTokenError("Token no encontrado.");
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/actuators', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setTokenError("Token inválido o caducado.");
        }
        throw new Error("Error fetching actuators");
      }

      const data = await response.json();
      const translatedData = data.map(actuator => ({
        ...actuator,
        type: translateActuator(actuator.type) // Traducción al español para la visualización
      }));
      setLinkedActuators(translatedData);
    } catch (error) {
      setErrors(error.message);
    }
  };

  const addActuator = async (name, code) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setTokenError("Token no encontrado.");
      return;
    }

    const translatedName = translationMap[name]; // Convertir el nombre al inglés para la base de datos
    const plot_id = localStorage.getItem("selectedPlotId");

    if (!code.trim()) {
      setErrors("Por favor, ingrese un código válido.");
      return;
    }
    if (!/^\d+$/.test(code)) {
      setErrors("El código debe ser un número.");
      return;
    }

    const actuatorData = {
      type: translatedName,
      plot_id: parseInt(plot_id, 10),
      code: code,
    };

    try {
      const response = await fetch('http://localhost:3000/api/actuators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(actuatorData),
      });

      const text = await response.text();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setTokenError("Token inválido o caducado.");
        }
        setErrors(`Error: ${text}`);
        return;
      }

      const newActuator = JSON.parse(text);
      setActuators([...actuators, newActuator]);
      setSuccessMessage(
        `Actuador ${name} con código "${code}" enlazado correctamente.`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      fetchLinkedActuators();
    } catch (error) {
      setErrors(`Error: ${error.message}`);
    }
  };

  const deleteActuator = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setTokenError("Token no encontrado.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/actuators/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setTokenError("Token inválido o caducado.");
        }
        throw new Error("Error deleting actuator");
      }

      setLinkedActuators(linkedActuators.filter(actuator => actuator.id !== id));
      setSuccessMessage("Actuador eliminado correctamente.");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrors(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchLinkedActuators();
  }, []);

  return (
    <ActuatorContext.Provider
      value={{
        actuators,
        selectedActuator,
        setSelectedActuator,
        showRemoveButtons,
        setShowRemoveButtons,
        addActuator,
        deleteActuator,
        fetchLinkedActuators,
        errors,
        tokenError,
        successMessage,
        linkedActuators,
      }}
    >
      {children}
    </ActuatorContext.Provider>
  );
};

export const useActuators = () => useContext(ActuatorContext);
