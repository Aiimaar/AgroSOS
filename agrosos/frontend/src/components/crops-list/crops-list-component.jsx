import React from "react";
import "./crops-list-component.css";
import ajo from "./images/ajo.png";
import rabano from "./images/rabano.png";
import platano from "./images/platano.png";
import fresas from "./images/fresas.png";
import tomates from "./images/tomates.png";
import zanahorias from "./images/zanahorias.png";
import lechugas from "./images/lechugas.png";
import pepinos from "./images/pepinos.png";
import esparragos from "./images/esparragos.png";
import pimientos from "./images/pimientos.png";
import albahaca from "./images/albahaca.png";
import calabacines from "./images/calabacines.png";
import berenjenas from "./images/berenjenas.png";
import cebollas from "./images/cebollas.png";
import papas from "./images/papas.png";


const CropsListComponent = () => {
    const crops = [
      { id: 1, image: ajo, name: "Ajo", harvest: "Jun - Jul" },
      { id: 2, image: rabano, name: "Rábanos", harvest: "Mrz - May" },
      { id: 3, image: platano, name: "Platanos", harvest: "Todo el año" },
      { id: 4, image: fresas, name: "Fresas", harvest: "Mrz - Jun" },
      { id: 5, image: tomates, name: "Tomates", harvest: "May - Sep" },
      { id: 6, image: zanahorias, name: "Zanahorias", harvest: "Abr - Jun" },
      { id: 7, image: lechugas, name: "Lechugas", harvest: "Mar - Oct" },
      { id: 8, image: pepinos, name: "Pepinos", harvest: "May - Ago" },
      { id: 9, image: esparragos, name: "Espárragos", harvest: "Mar - Jun" },
      { id: 10, image: pimientos, name: "Pimientos", harvest: "Jun - Sep" },
      { id: 11, image: albahaca, name: "Albahaca", harvest: "Abr - Oct" },
      { id: 12, image: calabacines, name: "Calabacines", harvest: "Jun - Sep" },
      { id: 13, image: berenjenas, name: "Berenjenas", harvest: "Jun - Sep" },
      { id: 14, image: cebollas, name: "Cebollas", harvest: "Jun - Oct" },
      { id: 15, image: papas, name: "Papas", harvest: "Todo el año" }
    ];
    
    

  return (
    <div className="crops-list">
      {crops.map((crop) => (
        <div className="crop-item" key={crop.id}>
          <div className="crop-content">
            <div className="crop-image-container">
              <img src={crop.image} alt={crop.name} className="crop-list-image" />
              <button className="info-icon">i</button>
            </div>
            <div className="crop-text">
              <p className="harvest-title">Tiempo de cosecha</p>
              <p className="harvest-subtitle">{crop.harvest}</p>
            </div>
          </div>
          <div className="divider" />
        </div>
      ))}
    </div>
  );
};

export default CropsListComponent;
