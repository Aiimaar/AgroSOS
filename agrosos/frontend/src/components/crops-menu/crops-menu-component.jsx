import React from "react";
import "./crops-menu-component.css";

const CropsMenuComponent = () => {
  return (
    <div className="crops-menu">
      <h1 className="title">Terreno 1</h1>
      <div className="buttons">
        <button className="button active">Cultivo</button>
        <button className="button">Sensores</button>
        <button className="button">Actuadores</button>
      </div>
    </div>
  );
};

export default CropsMenuComponent;
