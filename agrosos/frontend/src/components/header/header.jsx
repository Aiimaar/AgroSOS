  import React from "react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faBars } from "@fortawesome/free-solid-svg-icons";
  import "./header.css";
  import logo from "./logo.png";

  function Header() {
    return (
      <header className="header">
        <img src={logo} alt="Logo Planta" className="plant-icon" />
        <button className="menu-button">
          <FontAwesomeIcon icon={faBars} size="2xl" />
        </button>
      </header>
    );
  }

  export default Header;
