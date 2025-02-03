import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./crops-details-text-component.css";
import { useDarkMode } from "../../context/DarkModeContext";

const CropsDetailsTextComponent = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { darkMode } = useDarkMode(); // Contexto del modo oscuro

  useEffect(() => {
    // Recuperar el idioma desde el localStorage
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage); // Cambiar al idioma guardado en localStorage
    } else {
      i18n.changeLanguage("es"); // Si no hay idioma en localStorage, usar "es" como predeterminado
    }

    setLoading(false);
  }, [i18n]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div
      className={`crops-details-text-component-container ${
        darkMode ? "dark-mode" : ""
      }`}
      role="article"
    >
      <h2 className="crops-details-text-component-title" id="cultivo-titulo">
        {t("how_to_grow_garlic_title")}
      </h2>
      <p className="crops-details-text-component-paragraph">
        {t("growing_garlic_in_pots_description")}
      </p>
      <h3 className="crops-details-text-component-subtitle" id="seleccion-variedad">
        {t("selection_of_variety_and_pot")}
      </h3>
      <p className="crops-details-text-component-paragraph">
        {t("choose_garlic_variety_and_pot_description")}
      </p>
      <h3 className="crops-details-text-component-subtitle" id="preparacion-sustrato">
        {t("preparation_of_substrate")}
      </h3>
      <p className="crops-details-text-component-paragraph">
        {t("prepare_substrate_description")}
      </p>
      <h3 className="crops-details-text-component-subtitle" id="siembra-dientes">
        {t("garlic_clove_planting")}
      </h3>
      <p className="crops-details-text-component-paragraph">
        {t("plant_the_garlic_cloves")}
      </p>
      <h3 className="crops-details-text-component-subtitle" id="ubicacion-luz">
        {t("location_and_sunlight")}
      </h3>
      <p className="crops-details-text-component-paragraph">
        {t("place_pot_in_sunny_location")}
      </p>
      <h3 className="crops-details-text-component-subtitle" id="riego-cuidados">
        {t("watering_and_caring_for_garlic")}
      </h3>
      <p className="crops-details-text-component-paragraph">
        {t("moderate_watering_and_care")}
      </p>
      <h3 className="crops-details-text-component-subtitle" id="cosecha">
        {t("harvest")}
      </h3>
      <p className="crops-details-text-component-paragraph">
        {t("garlic_harvest_timing_and_process")}
      </p>
    </div>
  );
};

export default CropsDetailsTextComponent;
