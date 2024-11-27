import React from "react";
import { FaChartBar, FaCloud, FaSignOutAlt, FaClipboardCheck } from "react-icons/fa"; // Ejemplo con react-icons
import "./inside-plot-footer-component.css";

const InsidePlotFooterComponent = () => {
  return (
    <div className="footer-container">
      <div className="icon-wrapper">
        <FaChartBar className="icon" title="Chart" />
      </div>
      <div className="icon-wrapper">
        <FaCloud className="icon" title="Cloud" />
      </div>
      <div className="icon-wrapper">
        <FaSignOutAlt className="icon" title="Sync" />
      </div>
      <div className="icon-wrapper">
        <FaClipboardCheck className="icon" title="Checklist" />
      </div>
    </div>
  );
};

export default InsidePlotFooterComponent;
