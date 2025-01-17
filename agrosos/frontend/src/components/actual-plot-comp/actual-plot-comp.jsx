import React, { useState, useEffect } from 'react';
import "./actual-plot-comp.css";
import { useTranslation } from 'react-i18next'; // Importamos el hook useTranslation

function ActualPlotComp() {
  const [plotName, setPlotName] = useState(null);
  const { t } = useTranslation(); // Usamos el hook useTranslation para obtener las traducciones

  useEffect(() => {
    const storedPlotName = localStorage.getItem('selectedPlotName');
    if (storedPlotName) {
      setPlotName(storedPlotName);
    }
  }, []);

  return (
    <div id='actual-plot-comp-container'>
        {plotName ? (
          <p className='actual-plot-comp-text'>{plotName}</p>
        ) : (
          <p>{t('no_plot_selected')}</p> // Usamos la clave de traducción para el texto
        )}
    </div>
  );
}

export default ActualPlotComp;
