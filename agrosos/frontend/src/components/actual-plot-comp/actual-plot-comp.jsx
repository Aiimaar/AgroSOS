import React, { useState, useEffect } from 'react';
import "./actual-plot-comp.css";

function ActualPlotComp() {
  const [plotName, setPlotName] = useState(null);

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
        <p>No se ha seleccionado ningún terreno.</p>
      )}
    </div>
  );
}

export default ActualPlotComp;