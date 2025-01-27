import React from 'react';
import one from "./chart_icon.png";
import two from "./cloud_icon.png";
import three from "./Vector.png";
import four from "./bx_task.png";
import './inside-a-plot-footer-comp.css';
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function InsideAPlotFooter(){
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  const handleImageClick = (event) => {
    console.log('Imagen clickeada:', event.target.alt);
    // Aquí puedes agregar la lógica que necesitas
  };

  return (
    <footer className={`inside-a-plot-footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className='inside-a-plot-footer-comp-one'>
        <img src={one} alt="one" className='inside-a-plot-footer-comp-image-one'/>
      </div>
      <div 
        className="inside-a-plot-footer-comp-two" 
        role="button" 
        tabIndex="0" 
        aria-label="Acceder a información sobre el clima actual"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={two} 
          alt="Imagen representando una nube, indicando información climática"
          className="inside-a-plot-footer-comp-image-two"
        />
      </div>
      <div 
        className="inside-a-plot-footer-comp-two" 
        role="button" 
        tabIndex="0" 
        aria-label="Ver el vector de datos o de sensores"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={three} 
          alt="Vector que puede representar datos o dirección de sensores"
          className="inside-a-plot-footer-comp-image-three"
        />
      </div>
      <div 
        className="inside-a-plot-footer-comp-two" 
        role="button" 
        tabIndex="0" 
        aria-label="Ver lista de tareas pendientes"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={four} 
          alt="Icono que representa tareas o actividades pendientes"
          className="inside-a-plot-footer-comp-image-four"
        />
      </div>
    </footer>
  );
}

export default InsideAPlotFooter;
