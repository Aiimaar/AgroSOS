import React from "react";
import "./header-image-only.css";
import logo from "./logo.png"

const HeaderImageOnly = () => {
  return (
    <div className="header-image-only">
      <img
        src={logo}
        alt="FieldFlow Logo"
        className="header-logo"
      />
    </div>
  );
};

export default HeaderImageOnly;
