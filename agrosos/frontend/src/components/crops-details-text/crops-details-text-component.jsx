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
      <p className="crops-details-text-component-paragraph">
        {t("growing_garlic_in_pots_description")}
      </p>
      <h3 className="crops-details-text-component-subtitle">{t("selection_of_variety_and_pot")}</h3>
      <p className="crops-details-text-component-paragraph">
        {t("choose_garlic_variety_and_pot_description")}
      </p>
      <h3 className="crops-details-text-component-subtitle">{t("preparation_of_substrate")}</h3>
      <p className="crops-details-text-component-paragraph">
        {t("prepare_substrate_description")}
      </p>
      <h3 className="crops-details-text-component-subtitle">{t("garlic_clove_planting")}</h3>
      <p className="crops-details-text-component-paragraph">
        {t("plant_the_garlic_cloves")}
      </p>
      <h3 className="crops-details-text-component-subtitle">{t("location_and_sunlight")}</h3>
      <p className="crops-details-text-component-paragraph">
        {t("place_pot_in_sunny_location")}
      </p>
      <h3 className="crops-details-text-component-subtitle">{t("watering_and_caring_for_garlic")}</h3>
      <p className="crops-details-text-component-paragraph">
        {t("moderate_watering_and_care")}
      </p>
      <h3 className="crops-details-text-component-subtitle">{t("harvest")}</h3>
      <p className="crops-details-text-component-paragraph">
        {t("garlic_harvest_timing_and_process")}
      </p>
    </div>
  );
};

export default CropsDetailsTextComponent;
