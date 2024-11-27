import React from "react";
import graficaAjo from "./images/grafica-ajo.png";
import ajo from "./images/ajo.png";
import "./crops-details-header-component.css";

const CropsDetailsHeaderComponent = ({ cropImage = ajo, onBack }) => {
  return (
    <div className="crops-header">
      <button className="back-button" />
      <div className="crop-info">
        <div className="crop-image-container">
          <img src={ajo} alt="Crop" className="crop-image" />
        </div>
        <h1 className="crop-title">AJO</h1>
        <div className="chart-image-container">
          <img src={graficaAjo} alt="Chart" className="chart-image" />
        </div>
      </div>
    </div>
  );
};

export default CropsDetailsHeaderComponent;
