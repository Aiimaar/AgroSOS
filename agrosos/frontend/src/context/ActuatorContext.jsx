import React, { createContext, useState, useContext } from "react";

const ActuatorContext = createContext();

export const useActuators = () => useContext(ActuatorContext);

export const ActuatorProvider = ({ children }) => {
  const [linkedActuators, setLinkedActuators] = useState([]);

  const addActuator = (name, code) => {
    setLinkedActuators((prev) => [
      ...prev,
      { id: prev.length + 1, name, code },
    ]);
  };

  const deleteActuator = (id) => {
    setLinkedActuators((prev) => prev.filter((actuator) => actuator.id !== id));
  };

  return (
    <ActuatorContext.Provider value={{ linkedActuators, addActuator, deleteActuator }}>
      {children}
    </ActuatorContext.Provider>
  );
};
