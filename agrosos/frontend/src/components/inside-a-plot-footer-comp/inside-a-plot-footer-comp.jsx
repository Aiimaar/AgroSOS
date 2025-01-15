import React from 'react';
import one from "./chart_icon.png";
import two from "./cloud_icon.png";
import three from "./Vector.png";
import four from "./bx_task.png";
import './inside-a-plot-footer-comp.css';

function InsideAPlotFooter() {
  // Función para manejar el evento de clic o teclado (Enter/Space)
  const handleImageClick = (e) => {
    // Aquí se puede agregar la lógica de la acción que debe realizarse cuando el usuario haga clic o presione Enter/Espacio.
    console.log("Imagen clickeada:", e.target.alt);
  };

  return (
    <footer className="inside-a-plot-footer">
      <div 
        className="inside-a-plot-footer-comp-one" 
        role="button" 
        tabIndex="0" 
        aria-label="Ver gráfico de evolución de datos del cultivo"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={one} 
          alt="Gráfico de evolución mostrando el progreso del cultivo a lo largo del tiempo"
          className="inside-a-plot-footer-comp-image-one"
        />
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
