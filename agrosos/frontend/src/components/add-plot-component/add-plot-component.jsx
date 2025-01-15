import React from "react";
import { Link } from "react-router-dom";
import "./add-plot-component.css";
import plusCircleOutlined from "./plusCircleOutlined.png";

function AddPlotComponent() {
  return (
    <div className="add-plot-container">
      <p className="p-container">Crear un terreno</p>
      <Link to="/create-plot" aria-label="Crear nuevo terreno">
        <img 
          src={plusCircleOutlined} 
          alt="Icono de agregar terreno" 
          className="plusCircleOutlined" 
          role="button" 
          aria-label="Agregar un nuevo terreno" 
        />
      </Link>
    </div>
  );
}

export default AddPlotComponent;
