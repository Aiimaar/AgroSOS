import React from "react";
import "./create-plots-header-component.css";
import fieldflow from "./fieldflow.png";

function CreatePlotsHeaderComponent() {
    return (
        <div className="headerr">
            <img src={fieldflow} alt="fieldflow" className="fieldflow"/>
        </div>
    );
}

export default CreatePlotsHeaderComponent;
