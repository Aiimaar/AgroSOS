import React from "react";
import { Link } from "react-router-dom";
import "./plot-list-footer-comp.css";
import userProfileIcon from "./user-profile-icon.png";
import addPlotIcon from "./add-plot-icon.png";
import configIcon from "./config-icon.png";

const PlotListFooterComp = () => {
  return (
    <footer className="plot-list-footer">
        <div className="plot-list-img-container">
            <div className="plot-list-user-img-container">
                <Link to="/user-profile" className="img">
                    <img src={userProfileIcon} alt="User Profile" />
                </Link>
            </div>

            <div className="plot-list-create-plot-img-container">
                <Link to="/create-plot" className="img">
                    <img src={addPlotIcon} alt="Create Plot" />
                </Link>
            </div>

            <div className="plot-list-config-img-container">
                <Link to="/settings" className="img">
                    <img src={configIcon} alt="Configuration" />
                </Link>
            </div>
        </div>
    </footer>
  );
};

export default PlotListFooterComp;
