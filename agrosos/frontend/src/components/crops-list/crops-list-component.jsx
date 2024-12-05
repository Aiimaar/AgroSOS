import React, { useState, useEffect } from "react";
import axios from "axios";
import "./crops-list-component.css";

const CropsListComponent = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/crops");
        setCrops(response.data);
      } catch (error) {
        console.error("Error al obtener cultivos", error);
      }
    };
    fetchCrops();
  }, []);

  return (
    <div className="crops-list">
      {crops.map((crop) => (
        <div className="crop-item" key={crop.id}>
          <div className="crop-content">
            <div className="crop-image-container">
              <img 
                src={`http://localhost:3000/uploads/${crop.crop_image}`} 
                alt={crop.name} 
                className="crop-list-comp-image" 
              />
              <button className="info-icon">i</button>
            </div>
            <div className="crop-text">
              <p className="harvest-title">Tiempo de cosecha</p>
              <p className="harvest-subtitle">{crop.start_month} - {crop.end_month}</p>
            </div>
          </div>
          <div className="divider" />
        </div>
      ))}
    </div>
  );
};

export default CropsListComponent;
