import React from "react";
import "./crops-menu-component.css";

const CropsMenuComponent = () => {
  return (
    <div className="crops-menu">
      <h1 className="crops-menu-title">Terreno 1</h1>
      <div className="crops-menu-buttons">
        <button className="crops-menu-button active">Cultivo</button>
        <button className="crops-menu-button">Sensores</button>
        <button className="crops-menu-button">Actuadores</button>
      </div>
    </div>
  );
};

export default CropsMenuComponent;
