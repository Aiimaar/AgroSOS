import React from "react";
import "./header-image-only.css";
import logo from "./logo.png"

const HeaderImageOnly = () => {
  return (
    <div className="header-image-only">
      <img
        src={logo}
        alt="Logo de FieldFlow, una plataforma para gestionar cultivos y sensores"
        className="header-image-only-logo"
      />
    </div>
  );
};

export default HeaderImageOnly;
