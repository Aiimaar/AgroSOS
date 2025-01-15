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
    <div id='actual-plot-comp-container' role="region" aria-live="polite" aria-labelledby="plot-name-status">
        <h2 id="plot-name-status" className="sr-only">Estado de selección de terreno</h2> 
        {plotName ? (
          <p className='actual-plot-comp-text'>{plotName}</p>
        ) : (
          <p>No se ha seleccionado ningún terreno.</p>
        )}
    </div>
  );
}

export default ActualPlotComp;
