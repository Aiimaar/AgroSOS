import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./terms-conditions-text-component.css";

function TermsConditionText() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const lastUpdateDate = t("last_update_date");

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
        i18n.changeLanguage(response.data.language || "es");
      } catch (error) {
        i18n.changeLanguage("es");
      } finally {
        setLoading(false);
      }
    };
    fetchLanguage();
  }, [i18n]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="terms-condition-text-container">
      <button className="terms-back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="terms-condition-text-title">{t("terms_conditions_title")}</h1>
      <p className="terms-condition-text-paragraph">
        {t("last_update")} {lastUpdateDate}. {t("welcome_to_app")} [App Name].{" "}
        {t("terms_conditions")} ({t("terms")}). {t("accept_terms")}
      </p>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("acceptance_terms")}</span>
        <p className="terms-condition-text-paragraph">{t("access_use_terms")}</p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("use_of_app")}</span>
        <p className="terms-condition-text-paragraph">
          a. {t("age_requirement")} b. {t("legal_use_terms")} c. {t("no_abuse_app_usage")}
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("registration")}</span>
        <p className="terms-condition-text-paragraph">
          a. {t("account_creation")} b. {t("responsibility_for_credentials")}
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("privacy")}</span>
        <p className="terms-condition-text-paragraph">
          a. {t("collect_use_personal_data")} b. {t("privacy_policy_link")}
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("intellectual_property")}</span>
        <p className="terms-condition-text-paragraph">{t("ip_rights_terms")}</p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("liability_limitation")}</span>
        <p className="terms-condition-text-paragraph">
          a. {t("app_provided_as_is")} b. {t("liability_exclusion")}
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("modifications_terms")}</span>
        <p className="terms-condition-text-paragraph">{t("right_to_modify_terms")}</p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("termination")}</span>
        <p className="terms-condition-text-paragraph">{t("termination_of_access")}</p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("contact")}</span>
        <p className="terms-condition-text-paragraph">{t("contact_us")}</p>
      </div>
    </div>
  );
}

export default TermsConditionText;
