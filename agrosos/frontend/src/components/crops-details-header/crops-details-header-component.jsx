import React from "react";
import graficaAjo from "./images/grafica-ajo.png";
import ajo from "./images/ajo.png";
import "./crops-details-header-component.css";

const CropsDetailsHeaderComponent = ({ cultivationImage = ajo, onBack }) => {
  return (
    <div className="crops-header">
      <button className="back-button" onClick={onBack} />
      <div className="crop-info">
        <div className="cultivation-image-container">
          <img src={cultivationImage} alt="Crop" className="cultivation-image-details" />
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
