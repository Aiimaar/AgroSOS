import React from "react";
import "./cultive-component.css";
import cultive from "./cultivo.png";

function CultiveComponent() {
    return (
        <div className="add-crop-footer">
            <img 
                src={cultive} 
                alt="Imagen de cultivo" 
                className="cultive" 
                aria-describedby="cultive-description" 
            />
            <p id="cultive-description" className="sr-only">
                Imagen que representa el cultivo, utilizada como parte del diseño de la página.
            </p>
        </div>
    );
}

export default CultiveComponent;
