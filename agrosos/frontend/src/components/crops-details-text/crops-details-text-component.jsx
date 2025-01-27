<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./crops-details-text-component.css";

const CropsDetailsTextComponent = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchLanguage = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/users/1/language", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedLanguage = response.data.language || "es";
        setLanguage(fetchedLanguage);
        console.log("Language fetched from server:", fetchedLanguage);

        if (fetchedLanguage !== i18n.language) {
          i18n.changeLanguage(fetchedLanguage);
          console.log("Language applied:", fetchedLanguage);
        }

      } catch (error) {
        console.log("Error fetching language:", error);
        i18n.changeLanguage("es");
        setLanguage("es");
        console.log("Language applied: es");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [i18n]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  console.log("Current language in i18n:", i18n.language);

  return (
    <div className="crops-details-text-component-container">
      <h2 className="crops-details-text-component-title">{t("how_to_grow_garlic_title")}</h2>
=======
import React from 'react';
import './crops-details-text-component.css'; // Importa el archivo CSS
import { useDarkMode } from "../../context/DarkModeContext"; // Asegúrate de ajustar la ruta según tu estructura de archivos

const CropsDetailsTextComponent = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  return (
    <div className={`crops-details-text-component-container ${darkMode ? 'dark-mode' : ''}`} role="article">
      <h2 className="crops-details-text-component-title" id="cultivo-titulo">Cómo cultivar ajo en macetas en casa</h2>
>>>>>>> develop
      <p className="crops-details-text-component-paragraph">
        {t("growing_garlic_in_pots_description")}
      </p>
<<<<<<< HEAD
      <h3 className="crops-details-text-component-subtitle">{t("selection_of_variety_and_pot")}</h3>
=======
      <h3 className="crops-details-text-component-subtitle" id="seleccion-variedad">1. Selección de la variedad y maceta</h3>
>>>>>>> develop
      <p className="crops-details-text-component-paragraph">
        {t("choose_garlic_variety_and_pot_description")}
      </p>
<<<<<<< HEAD
      <h3 className="crops-details-text-component-subtitle">{t("preparation_of_substrate")}</h3>
=======
      <h3 className="crops-details-text-component-subtitle" id="preparacion-sustrato">2. Preparación del sustrato</h3>
>>>>>>> develop
      <p className="crops-details-text-component-paragraph">
        {t("prepare_substrate_description")}
      </p>
<<<<<<< HEAD
      <h3 className="crops-details-text-component-subtitle">{t("garlic_clove_planting")}</h3>
=======
      <h3 className="crops-details-text-component-subtitle" id="siembra-dientes">3. Siembra de los dientes de ajo</h3>
>>>>>>> develop
      <p className="crops-details-text-component-paragraph">
        {t("plant_the_garlic_cloves")}
      </p>
<<<<<<< HEAD
      <h3 className="crops-details-text-component-subtitle">{t("location_and_sunlight")}</h3>
=======
      <h3 className="crops-details-text-component-subtitle" id="ubicacion-luz">4. Ubicación y luz solar</h3>
>>>>>>> develop
      <p className="crops-details-text-component-paragraph">
        {t("place_pot_in_sunny_location")}
      </p>
<<<<<<< HEAD
      <h3 className="crops-details-text-component-subtitle">{t("watering_and_caring_for_garlic")}</h3>
=======
      <h3 className="crops-details-text-component-subtitle" id="riego-cuidados">5. Riego y cuidado del ajo</h3>
>>>>>>> develop
      <p className="crops-details-text-component-paragraph">
        {t("moderate_watering_and_care")}
      </p>
<<<<<<< HEAD
      <h3 className="crops-details-text-component-subtitle">{t("harvest")}</h3>
=======
      <h3 className="crops-details-text-component-subtitle" id="cosecha">6. Cosecha</h3>
>>>>>>> develop
      <p className="crops-details-text-component-paragraph">
        {t("garlic_harvest_timing_and_process")}
      </p>
    </div>
  );
};

export default CropsDetailsTextComponent;
