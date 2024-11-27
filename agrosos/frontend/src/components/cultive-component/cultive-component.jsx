import React from "react";
import "./cultive-component.css"
import cultive from "./cultivo.png";

function CultiveComponent() {
    return (
        <div className="footer">
            <img src={cultive} alt="cultive" className="cultive"/>
        </div>
    );
}

export default CultiveComponent;
