import React from "react";
import "./cultive-component.css";
import cultive from "./cultivo.png";

function CultiveComponent() {
    return (
        <div className="add-crop-footer">
            <img 
                src={cultive} 
                alt="Imagen de cultivo de planta" 
                className="cultive"
            />
        </div>
    );
}

export default CultiveComponent;
