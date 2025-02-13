import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./terms-conditions-text-component.css";
import { useDarkMode } from "../../context/DarkModeContext"; // Ajusta la ruta si es necesario

function TermsConditionText() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const lastUpdateDate = t("last_update_date");
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  useEffect(() => {
    // Recuperar el idioma del localStorage
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    } else {
      // Si no se encuentra el idioma en localStorage, usar el idioma por defecto
      i18n.changeLanguage("es");
    }

    setLoading(false);
  }, [i18n]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div
      className={`terms-condition-text-container ${darkMode ? "dark-mode" : ""}`}
    >
      <button
        className="terms-back-button"
        onClick={() => navigate(-1)}
        aria-label="Volver"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="terms-condition-text-title" id="terms-heading">
        {t("terms_conditions_title")}
      </h1>
      <p className="terms-condition-text-paragraph">
        {t("last_update")} {lastUpdateDate}. {t("welcome_to_app")} AgroSOS.{" "}
        {t("terms_conditions")} ({t("terms")}). {t("accept_terms")}
      </p>
      <div className="terms-condition-text-section" aria-labelledby="section-1">
        <h2 id="section-1" className="sr-only">
          1. Aceptación de los Términos
        </h2>
        <span
          className="terms-condition-text-section-number"
          aria-labelledby="section-1"
        >
          {t("acceptance_terms")}
        </span>
        <p className="terms-condition-text-paragraph">
          {t("access_use_terms")}
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">
          {t("use_of_app")}
        </span>
        <p className="terms-condition-text-paragraph">
          {t("age_requirement")} {t("legal_use_terms")}{" "}
          {t("no_abuse_app_usage")}
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-2">
        <h2 id="section-2" className="sr-only">
          2. Uso de la App
        </h2>
        <span
          className="terms-condition-text-section-number"
          aria-labelledby="section-2"
        >
          {t("registration")}
        </span>
        <p className="terms-condition-text-paragraph">
          {t("account_creation")} {t("responsibility_for_credentials")}
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-3">
        <h2 id="section-3" className="sr-only">
          3. Registro y Cuentas
        </h2>
        <span
          className="terms-condition-text-section-number"
          aria-labelledby="section-3"
        >
          {t("privacy")}
        </span>
        <p className="terms-condition-text-paragraph">
          {t("collect_use_personal_data")} {t("privacy_policy_link")}
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-4">
        <h2 id="section-4" className="sr-only">
          4. Privacidad
        </h2>
        <span
          className="terms-condition-text-section-number"
          aria-labelledby="section-4"
        >
          {t("intellectual_property")}
        </span>
        <p className="terms-condition-text-paragraph">{t("ip_rights_terms")}</p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">
          {t("liability_limitation")}
        </span>
        <p className="terms-condition-text-paragraph">
          {t("app_provided_as_is")} {t("liability_exclusion")}
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-5">
        <h2 id="section-5" className="sr-only">
          5. Propiedad Intelectual
        </h2>
        <span
          className="terms-condition-text-section-number"
          aria-labelledby="section-5"
        >
          {t("modifications_terms")}
        </span>
        <p className="terms-condition-text-paragraph">
          {t("right_to_modify_terms")}
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">
          {t("termination")}
        </span>
        <p className="terms-condition-text-paragraph">
          {t("termination_of_access")}
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">
          {t("contact")}
        </span>
        <p className="terms-condition-text-paragraph">{t("contact_us")}</p>
      </div>
    </div>
  );
}

export default TermsConditionText;
