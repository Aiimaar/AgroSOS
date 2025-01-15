import React from 'react';
import one from "./chart_icon.png";
import two from "./cloud_icon.png";
import three from "./Vector.png";
import four from "./bx_task.png";
import './inside-a-plot-footer-comp.css';

function InsideAPlotFooter() {
  return (
    <footer className="inside-a-plot-footer" aria-label="Pie de página del terreno">
      <div
        className="inside-a-plot-footer-comp-one"
        role="button"
        aria-label="Acceso al gráfico del terreno"
        tabIndex="0"
      >
        <img
          src={one}
          alt="Gráfico"
          className="inside-a-plot-footer-comp-image-one"
        />
      </div>
      <div
        className="inside-a-plot-footer-comp-two"
        role="button"
        aria-label="Información meteorológica del terreno"
        tabIndex="0"
      >
        <img
          src={two}
          alt="Clima"
          className="inside-a-plot-footer-comp-image-two"
        />
      </div>
      <div
        className="inside-a-plot-footer-comp-two"
        role="button"
        aria-label="Configuración del terreno"
        tabIndex="0"
      >
        <img
          src={three}
          alt="Configuración"
          className="inside-a-plot-footer-comp-image-three"
        />
      </div>
      <div
        className="inside-a-plot-footer-comp-two"
        role="button"
        aria-label="Lista de tareas del terreno"
        tabIndex="0"
      >
        <img
          src={four}
          alt="Tareas"
          className="inside-a-plot-footer-comp-image-four"
        />
      </div>
    </footer>
  );
}

export default InsideAPlotFooter;
