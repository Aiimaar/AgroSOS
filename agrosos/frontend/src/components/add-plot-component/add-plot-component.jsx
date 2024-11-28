import React from "react";
import { Link } from "react-router-dom";
import "./add-plot-component.css";
import plusCircleOutlined from "./plusCircleOutlined.png";

function AddPlotComponent() {
    return (
        <div className="add-plot-container">
            <p className="p-container">Crear un terreno</p>
            <Link to="/create-plot" ><img src={plusCircleOutlined} alt="plusCircleOutlined" className="plusCircleOutlined"/> </Link>
        </div>
    );
}

export default AddPlotComponent;
