import React, { useEffect, useState } from "react";
import "./settings-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

function SettingsComponent() {
  const { t, i18n } = useTranslation();  // Obtén las funciones de traducción
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");  // Obtener el role del localStorage
  const navigate = useNavigate();

  // Fetch language preference from the server (similarly to the example you gave)
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
        if (fetchedLanguage !== i18n.language) {
          i18n.changeLanguage(fetchedLanguage);
        }

      } catch (error) {
        console.log("Error fetching language:", error);
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
    <div id="container-settings">
      <button className="settings-arrow-container" onClick={() => navigate("/plot-list")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <h1 className="settings-text">{t("settings")}</h1>

      <div className="settings-container-elements">
        <Link to="/notifications">
          <div className="settings-noti">
            <p className="settings-p">{t("alerts_notifications")}</p>
          </div>
        </Link>

        <div className="settings-export">
          <p className="settings-p">{t("export_land")}</p>
          <div className="settings-ex">
            <p className="settings-subp">{t("csv")}</p>
            <p className="settings-sub">|</p>
            <p className="settings-subp">{t("excel")}</p>
          </div>
        </div>

        <div className="settings-actu">
          <p className="settings-p">{t("check_updates")}</p>
        </div>

        <div className="settings-help">
          <p className="settings-p">{t("help_support")}</p>
        </div>

        {/* Mostrar "Reglas" solo para Technician y Admin */}
        {role === "Technician" || role === "Admin" ? (
          <div className="settings-rules">
            <Link to="/rules">
              <p className="settings-p">{t("rules")}</p>
            </Link>
          </div>
        ) : null}

        {/* Mostrar "Lista de usuarios" solo para Admin */}
        {role === "Admin" ? (
          <div className="settings-userc">
            <Link to="/admin-user-crud">
              <p className="settings-p">{t("user_list")}</p>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SettingsComponent;
