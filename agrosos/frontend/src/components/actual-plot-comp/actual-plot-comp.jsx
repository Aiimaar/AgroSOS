import React, { useState, useEffect } from 'react';
import "./actual-plot-comp.css";

function ActualPlotComp() {
  const [plotId, setPlotId] = useState(null);

  useEffect(() => {
    const storedPlotId = localStorage.getItem('selectedPlotId');
    if (storedPlotId) {
      setPlotId(storedPlotId);
    }
  }, []);

  return (
    <div id='actual-plot-comp-container'>
        {plotId ? (
        <p className='actual-plot-comp-text'>Terreno {plotId}</p>
      ) : (
        <p>No se ha seleccionado ningún terreno.</p>
      )}
    </div>
  );
}

export default ActualPlotComp;