import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react'; // Importa el componente de Iconify
import './inside-a-plot-footer-comp.css'; // Importa el archivo CSS

const InsideAPlotFooter = () => {
  const navigate = useNavigate();
  const plotId = localStorage.getItem('selectedPlotId'); // Obtener el ID del terreno

  if (!plotId) {
    console.error('No plot ID found in localStorage.');
    return null; // Puedes añadir una redirección o un mensaje de error aquí
  }

  return (
    <footer className="inside-a-plot-footer">
      <button onClick={() => navigate(`/plot/${plotId}/chart`)} className="inside-a-plotfooter-button">
        {/* Icono de gráfico */}
        <Icon icon="akar-icons:chart-bar" width={24} height={24} />
      </button>
      <button onClick={() => navigate(`/plot/${plotId}/weather`)} className="inside-a-plot-footer-button">
        {/* Icono de clima */}
        <Icon icon="twemoji:cloud" width={24} height={24} />
      </button>
      <button onClick={() => navigate(`/plot/${plotId}/actions`)} className="inside-a-plot-footer-button">
        {/* Icono de acciones */}
        <Icon icon="twemoji:arrows-counterclockwise" width={24} height={24} />
      </button>
      <button onClick={() => navigate(`/plot/${plotId}/tasks`)} className="inside-a-plot-footer-button">
        {/* Icono de tarea */}
        <Icon icon="twemoji:white-check-mark" width={24} height={24} />
      </button>
    </footer>
  );
};

export default InsideAPlotFooter;
