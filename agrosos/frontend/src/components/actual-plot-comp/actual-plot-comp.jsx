import React, { useState, useEffect } from 'react';
import "./actual-plot-comp.css";
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos

function ActualPlotComp() {
  const [plotName, setPlotName] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  useEffect(() => {
    const storedPlotName = localStorage.getItem('selectedPlotName');
    if (storedPlotName) {
      setPlotName(storedPlotName);
    }
  }, []);

  return (
    <div id='actual-plot-comp-container' className={darkMode ? 'dark-mode' : ''}>
      {plotName ? (
        <p className='actual-plot-comp-text'>{plotName}</p>
      ) : (
        <p>No se ha seleccionado ningún terreno.</p>
      )}
    </div>
  );
}

export default ActualPlotComp;
