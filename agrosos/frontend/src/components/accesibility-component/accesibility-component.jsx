import React, { useState, useEffect } from 'react';
import "./accesibility-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function AccesibilityComponent() {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useDarkMode();

    // Leer el estado inicial desde el localStorage (lo retiraremos ya que usamos el contexto)
    // const [darkMode, setDarkMode] = useState(() => {
    //     return localStorage.getItem('darkMode') === 'true'; // Devuelve true si está activado
    // });

    // useEffect(() => {
    //     // Guardar en localStorage cuando cambie darkMode
    //     localStorage.setItem('darkMode', darkMode);
    // }, [darkMode]);

    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // };

    return (
        <div id="container-accesibility" className={darkMode ? 'dark-mode' : ''}>
            <div className="arrow-container">
                <button
                    className="accesibility-arrow"
                    onClick={() => navigate(-1)}
                    aria-label="Volver"
                >
                    <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                </button>
            </div>
            <h1
                id="accesibility-title"
                className="accesibility-text"
            >
                Accesibilidad
            </h1>
            <div className="accesibility-size">
                <p
                    className="accesibility-p"
                    id="text-size-label"
                    role="note"
                >
                    Tamaño del texto
                </p>
            </div>
            <div className="accesibility-tuto">
                <p
                    className="accesibility-p"
                    id="app-tutorial-label"
                    role="note"
                >
                    Tutorial Aplicación
                </p>
            </div>
            <div className="accesibility-dark-mode">
                <p className="accesibility-p" onClick={toggleDarkMode}>
                    {darkMode ? 'Modo claro' : 'Modo oscuro'}
                </p>
            </div>
        </div>
    );
}

export default AccesibilityComponent;
