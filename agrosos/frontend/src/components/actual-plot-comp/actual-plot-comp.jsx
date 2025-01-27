import React, { useState, useEffect } from 'react';
import "./actual-plot-comp.css";
import { useDarkMode } from "../../context/DarkModeContext"; 
import { useTranslation } from 'react-i18next'; // Importamos el hook useTranslation

function ActualPlotComp() {
  const [plotName, setPlotName] = useState(null);
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useDarkMode(); 

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
