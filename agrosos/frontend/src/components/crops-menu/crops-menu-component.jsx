import React from "react";
import "./crops-menu-component.css";
import { Link } from "react-router-dom";

const CropsMenuComponent = () => {
  return (
    <div className="crops-menu">
      <h1 className="crops-menu-title">Terreno 1</h1>
      <div className="crops-menu-buttons">
        <Link to="/crops"><button className="crops-menu-button active">Cultivo</button></Link>
        <Link to="/sensors"><button className="crops-menu-button">Sensores</button></Link>
        <Link to="/actuators"><button className="crops-menu-button">Actuadores</button></Link>
      </div>
    </div>
  );
};

export default CropsMenuComponent;
