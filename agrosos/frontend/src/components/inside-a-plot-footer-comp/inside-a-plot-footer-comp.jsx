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
        aria-label="Gráfico de evolución"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={one} 
          alt="Gráfico de evolución" 
          className="inside-a-plot-footer-comp-image-one"
        />
      </div>
      <div 
        className="inside-a-plot-footer-comp-two" 
        role="button" 
        tabIndex="0" 
        aria-label="Nube"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={two} 
          alt="Nube" 
          className="inside-a-plot-footer-comp-image-two"
        />
      </div>
      <div 
        className="inside-a-plot-footer-comp-two" 
        role="button" 
        tabIndex="0" 
        aria-label="Vector"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={three} 
          alt="Vector" 
          className="inside-a-plot-footer-comp-image-three"
        />
      </div>
      <div 
        className="inside-a-plot-footer-comp-two" 
        role="button" 
        tabIndex="0" 
        aria-label="Tareas"
        onClick={handleImageClick} 
        onKeyPress={(e) => e.key === 'Enter' || e.key === ' ' ? handleImageClick(e) : null}
      >
        <img 
          src={four} 
          alt="Tareas" 
          className="inside-a-plot-footer-comp-image-four"
        />
      </div>
    </footer>
  );
};

export default InsideAPlotFooter;
