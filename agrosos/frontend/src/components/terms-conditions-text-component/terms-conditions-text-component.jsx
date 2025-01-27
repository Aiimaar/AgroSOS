import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./terms-conditions-text-component.css";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function TermsConditionText() {
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto
>>>>>>> develop

  return (
    <div className={`terms-condition-text-container ${darkMode ? 'dark-mode' : ''}`}>
      <button className="terms-back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
<<<<<<< HEAD
      <h1 className="terms-condition-text-title">{t("terms_conditions_title")}</h1>
=======
      <h1 className="terms-condition-text-title" id="terms-heading">Términos y condiciones</h1>
>>>>>>> develop
      <p className="terms-condition-text-paragraph">
        {t("last_update")} {lastUpdateDate}. {t("welcome_to_app")} [App Name].{" "}
        {t("terms_conditions")} ({t("terms")}). {t("accept_terms")}
      </p>
<<<<<<< HEAD
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("acceptance_terms")}</span>
        <p className="terms-condition-text-paragraph">{t("access_use_terms")}</p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("use_of_app")}</span>
=======
      <div className="terms-condition-text-section" aria-labelledby="section-1">
        <h2 id="section-1" className="sr-only">1. Aceptación de los Términos</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-1">1. Aceptación de los Términos:</span>
>>>>>>> develop
        <p className="terms-condition-text-paragraph">
          a. {t("age_requirement")} b. {t("legal_use_terms")} c. {t("no_abuse_app_usage")}
        </p>
      </div>
<<<<<<< HEAD
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("registration")}</span>
=======
      <div className="terms-condition-text-section" aria-labelledby="section-2">
        <h2 id="section-2" className="sr-only">2. Uso de la App</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-2">2. Uso de la App:</span>
>>>>>>> develop
        <p className="terms-condition-text-paragraph">
          a. {t("account_creation")} b. {t("responsibility_for_credentials")}
        </p>
      </div>
<<<<<<< HEAD
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("privacy")}</span>
=======
      <div className="terms-condition-text-section" aria-labelledby="section-3">
        <h2 id="section-3" className="sr-only">3. Registro y Cuentas</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-3">3. Registro y Cuentas:</span>
>>>>>>> develop
        <p className="terms-condition-text-paragraph">
          a. {t("collect_use_personal_data")} b. {t("privacy_policy_link")}
        </p>
      </div>
<<<<<<< HEAD
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("intellectual_property")}</span>
        <p className="terms-condition-text-paragraph">{t("ip_rights_terms")}</p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">{t("liability_limitation")}</span>
=======
      <div className="terms-condition-text-section" aria-labelledby="section-4">
        <h2 id="section-4" className="sr-only">4. Privacidad</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-4">4. Privacidad:</span>
>>>>>>> develop
        <p className="terms-condition-text-paragraph">
          a. {t("app_provided_as_is")} b. {t("liability_exclusion")}
        </p>
      </div>
<<<<<<< HEAD
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
=======
      <div className="terms-condition-text-section" aria-labelledby="section-5">
        <h2 id="section-5" className="sr-only">5. Propiedad Intelectual</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-5">5. Propiedad Intelectual:</span>
        <p className="terms-condition-text-paragraph">
          a. Todos los derechos de propiedad intelectual en la App y su
          contenido (incluyendo, sin limitación, software, texto, gráficos,
          logotipos y marcas registradas) son propiedad nuestra o de nuestros
          licenciantes. b. No se te concede ningún derecho o licencia sobre la
          propiedad intelectual de la App, excepto lo expresamente establecido
          en estos Términos.
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-6">
        <h2 id="section-6" className="sr-only">6. Limitación de Responsabilidad</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-6">6. Limitación de Responsabilidad:</span>
        <p className="terms-condition-text-paragraph">
          a. La App se proporciona "tal cual" y "según disponibilidad". No
          garantizamos que la App esté libre de errores o interrupciones. b. En
          la máxima medida permitida por la ley, no seremos responsables de
          ningún daño indirecto, incidental, especial, consecuente o punitivo
          que surja del uso de la App.
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-7">
        <h2 id="section-7" className="sr-only">7. Modificaciones a los Términos</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-7">7. Modificaciones a los Términos:</span>
        <p className="terms-condition-text-paragraph">
          a. Nos reservamos el derecho de modificar estos Términos en cualquier
          momento. Cualquier cambio se publicará en esta página y, si los
          cambios son significativos, te proporcionaremos una notificación
          adicional. Tu uso continuo de la App después de tales modificaciones
          constituye tu aceptación de los nuevos Términos.
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-8">
        <h2 id="section-8" className="sr-only">8. Terminación</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-8">8. Terminación:</span>
        <p className="terms-condition-text-paragraph">
          a. Podemos suspender o terminar tu acceso a la App en cualquier
          momento, sin previo aviso, si incumples estos Términos o si decidimos
          descontinuar la App.
        </p>
      </div>
      <div className="terms-condition-text-section" aria-labelledby="section-9">
        <h2 id="section-9" className="sr-only">9. Contacto</h2>
        <span className="terms-condition-text-section-number" aria-labelledby="section-9">9. Contacto:</span>
        <p className="terms-condition-text-paragraph">
          a. Si tienes alguna pregunta o inquietud sobre estos Términos, puedes
          contactarnos en [Correo electrónico de contacto].
        </p>
>>>>>>> develop
      </div>
    </div>
  );
}

export default TermsConditionText;
