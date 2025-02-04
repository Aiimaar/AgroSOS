import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./add-plot-component.css";
import plusCircleOutlined from "./plusCircleOutlined.png";

function AddPlotComponent() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Obtener el idioma del localStorage y establecerlo
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage && savedLanguage !== i18n.language) {
          i18n.changeLanguage(savedLanguage);
        }
        console.log("Idioma actual al cargar el componente:", i18n.language); // Verificar idioma al cargar
      }, []);
    
      useEffect(() => {
        console.log("Idioma actualizado:", i18n.language); // Detectar cambios en el idioma
        // Guardar el idioma en localStorage cuando cambie
        localStorage.setItem("language", i18n.language);
      }, [i18n.language]);

    return (
        <div className="add-plot-container">
            <p className="p-container" aria-label="Crear nuevo terreno">{t("add_plot")}</p>
            {/* Añadido texto alternativo descriptivo */}
            <Link to="/create-plot" >
                <img 
                    src={plusCircleOutlined} 
                    alt="Icono de un círculo con un signo más, para crear un nuevo terreno" 
                    className="plusCircleOutlined"
                    role="button" 
                    aria-label="Agregar un nuevo terreno" 
                />
            </Link>
        </div>
    );
}

export default AddPlotComponent;
