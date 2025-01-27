import React, { useState, useEffect } from 'react';
import "./accesibility-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import axios from "axios";

function AccesibilityComponent() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const userId = 1;  // TODO: Reemplazar con el userId dinámico del sistema de autenticación.

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.log("Token no encontrado");
            return;
        }

        axios.get(`http://localhost:3000/api/users/${userId}/language`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const { language } = response.data;
            console.log("Idioma recuperado del backend:", language);
            i18n.changeLanguage(language);  // Actualiza el idioma con el valor obtenido
        })
        .catch(error => {
            console.error("Error al obtener el idioma:", error.response?.data || error.message);
        });
    }, [userId, i18n]);

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);

        const token = localStorage.getItem("authToken");
        if (!token) {
            console.log("Token no encontrado");
            return;
        }

        axios.put(`http://localhost:3000/api/users/${userId}/language`, { language: selectedLanguage }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Idioma actualizado en el backend:", response.data);
        })
        .catch(error => {
            console.error("Error al actualizar el idioma:", error.response?.data || error.message);
        });

        console.log("Idioma seleccionado:", selectedLanguage);
    };
=======
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
>>>>>>> develop

    return (
        <div id="container-accesibility" className={darkMode ? 'dark-mode' : ''}>
            <div className="arrow-container">
<<<<<<< HEAD
                <button className="accesibility-arrow" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            <h1 className="accesibility-text">{t('accessibility')}</h1>
            <div className="accesibility-size">
                <p className="accesibility-p">{t('text_size')}</p>
            </div>
            <div className="accesibility-tuto">
                <p className="accesibility-p">{t('tutorial')}</p>
            </div>
            <div className="language-selector">
                <label htmlFor="language-select">{t('select_language')}</label>
                <select
                    id="language-select"
                    onChange={handleLanguageChange}
                    value={i18n.language}
                >
                    <option value="es">{t('spanish')}</option>
                    <option value="en">{t('english')}</option>
                </select>
=======
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
>>>>>>> develop
            </div>
        </div>
    );
}

export default AccesibilityComponent;
