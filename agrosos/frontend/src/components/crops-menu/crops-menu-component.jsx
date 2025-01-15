import React from "react";
import "./crops-menu-component.css";
import { Link } from "react-router-dom";

const CropsMenuComponent = () => {
  return (
    <div className="crops-menu">
      <h1 className="crops-menu-title">Terreno 1</h1>
      <div className="crops-menu-buttons" role="navigation" aria-label="Menú de navegación de terreno">
        <Link to="/crops">
        <button 
            className="crops-menu-button active" 
            aria-label="Ver cultivo del terreno"
        >
            {/* Aquí podrías agregar una imagen con un texto alternativo */}
            <img src="cultivo-icon.png" alt="Icono de Cultivo" className="button-icon" />
            Cultivo
          </button>
        </Link>
        <Link to="/sensors">
          <button 
          className="crops-menu-button" 
          aria-label="Ver sensores del terreno"
          >
            {/* Aquí podrías agregar una imagen con un texto alternativo */}
            <img src="sensores-icon.png" alt="Icono de Sensores" className="button-icon" />
            Sensores
          </button>
        </Link>
        <Link to="/actuators">
          <button 
          className="crops-menu-button" 
          aria-label="Ver actuadores del terreno"
        >
            {/* Aquí podrías agregar una imagen con un texto alternativo */}
            <img src="actuadores-icon.png" alt="Icono de Actuadores" className="button-icon" />
            Actuadores
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CropsMenuComponent;
