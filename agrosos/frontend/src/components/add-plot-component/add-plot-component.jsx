import React from "react";
import { Link } from "react-router-dom";
import "./add-plot-component.css";
import plusCircleOutlined from "./plusCircleOutlined.png";

function AddPlotComponent() {
    return (
        <div className="add-plot-container">
            <p className="p-container" aria-label="Crear nuevo terreno">Crear un terreno</p>
            {/* Añadido texto alternativo descriptivo */}
            <Link to="/create-plot" >
                <img 
                    src={plusCircleOutlined} 
                    alt="Icono de un círculo con un signo más, para crear un nuevo terreno" 
                    className="plusCircleOutlined"
                    role="button" 
                    aria-label="Agregar un nuevo terreno" 
                />
            </Link>
        </div>
    );
}

export default AddPlotComponent;
