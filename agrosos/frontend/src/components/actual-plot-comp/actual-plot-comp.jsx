import React, { useState, useEffect } from 'react';
import "./actual-plot-comp.css";
<<<<<<< HEAD
import { useTranslation } from 'react-i18next'; // Importamos el hook useTranslation

function ActualPlotComp() {
  const [plotName, setPlotName] = useState(null);
  const { t } = useTranslation(); // Usamos el hook useTranslation para obtener las traducciones
=======
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos

function ActualPlotComp() {
  const [plotName, setPlotName] = useState(null);
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto
>>>>>>> develop

  useEffect(() => {
    const storedPlotName = localStorage.getItem('selectedPlotName');
    if (storedPlotName) {
      setPlotName(storedPlotName);
    }
  }, []);

  return (
<<<<<<< HEAD
    <div id='actual-plot-comp-container'>
        {plotName ? (
          <p className='actual-plot-comp-text'>{plotName}</p>
        ) : (
          <p>{t('no_plot_selected')}</p> // Usamos la clave de traducción para el texto
        )}
=======
    <div id='actual-plot-comp-container' className={darkMode ? 'dark-mode' : ''}>
      {plotName ? (
        <p className='actual-plot-comp-text'>{plotName}</p>
      ) : (
        <p>No se ha seleccionado ningún terreno.</p>
      )}
>>>>>>> develop
    </div>
  );
}

export default ActualPlotComp;
