import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "../side-menu-comp/side-menu-comp";
import logo from "./logo.png";
import "./header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <img src={ logo } alt="Logo Planta" className="plant-icon" />
        <button className="header-menu-button" onClick={openMenu}>
          <FontAwesomeIcon icon={faBars} size="2xl" />
        </button>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

export default Header;
