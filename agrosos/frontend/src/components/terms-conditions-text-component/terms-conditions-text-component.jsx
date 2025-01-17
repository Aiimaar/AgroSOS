import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./terms-conditions-text-component.css";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function TermsConditionText() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  return (
    <div className={`terms-condition-text-container ${darkMode ? 'dark-mode' : ''}`}>
      <button className="terms-back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1 className="terms-condition-text-title">Términos y condiciones</h1>
      <p className="terms-condition-text-paragraph">
        Última actualización: [Fecha] Bienvenido a [Nombre de la App] ("la
        App"). Estos Términos y Condiciones ("Términos") rigen el uso de nuestra
        aplicación y los servicios proporcionados por [Nombre de la Empresa]
        ("nosotros" o "nuestro"). Al descargar, instalar y utilizar la App,
        aceptas estar sujeto a estos Términos.
      </p>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">1. Aceptación de los Términos:</span>
        <p className="terms-condition-text-paragraph">
          Al acceder o usar la App, aceptas estos Términos y te comprometes a
          cumplir con todas las leyes y regulaciones aplicables. Si no estás de
          acuerdo con alguna parte de estos Términos, no debes usar la App.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">2. Uso de la App:</span>
        <p className="terms-condition-text-paragraph">
          a. Debes tener al menos 18 años de edad para usar la App. b. Te
          comprometes a usar la App únicamente para fines lícitos y de acuerdo
          con estos Términos. c. Está prohibido utilizar la App de cualquier
          manera que pueda dañar, desactivar, sobrecargar o deteriorar nuestros
          servidores o interferir con el uso de la App por parte de otros
          usuarios.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">3. Registro y Cuentas:</span>
        <p className="terms-condition-text-paragraph">
          a. Para acceder a ciertas funciones de la App, es posible que
          necesites crear una cuenta. b. Eres responsable de mantener la
          confidencialidad de tus credenciales de inicio de sesión y de todas
          las actividades que ocurran bajo tu cuenta.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">4. Privacidad:</span>
        <p className="terms-condition-text-paragraph">
          a. Recopilamos y usamos tu información personal de acuerdo con nuestra
          Política de Privacidad, disponible en [Enlace a la Política de
          Privacidad]. b. Al usar la App, aceptas la recopilación y el uso de tu
          información según nuestra Política de Privacidad.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">5. Propiedad Intelectual:</span>
        <p className="terms-condition-text-paragraph">
          a. Todos los derechos de propiedad intelectual en la App y su
          contenido (incluyendo, sin limitación, software, texto, gráficos,
          logotipos y marcas registradas) son propiedad nuestra o de nuestros
          licenciantes. b. No se te concede ningún derecho o licencia sobre la
          propiedad intelectual de la App, excepto lo expresamente establecido
          en estos Términos.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">
          6. Limitación de Responsabilidad:
        </span>
        <p className="terms-condition-text-paragraph">
          a. La App se proporciona "tal cual" y "según disponibilidad". No
          garantizamos que la App esté libre de errores o interrupciones. b. En
          la máxima medida permitida por la ley, no seremos responsables de
          ningún daño indirecto, incidental, especial, consecuente o punitivo
          que surja del uso de la App.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">
          7. Modificaciones a los Términos:
        </span>
        <p className="terms-condition-text-paragraph">
          a. Nos reservamos el derecho de modificar estos Términos en cualquier
          momento. Cualquier cambio se publicará en esta página y, si los
          cambios son significativos, te proporcionaremos una notificación
          adicional. Tu uso continuo de la App después de tales modificaciones
          constituye tu aceptación de los nuevos Términos.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">8. Terminación:</span>
        <p className="terms-condition-text-paragraph">
          a. Podemos suspender o terminar tu acceso a la App en cualquier
          momento, sin previo aviso, si incumples estos Términos o si decidimos
          descontinuar la App.
        </p>
      </div>
      <div className="terms-condition-text-section">
        <span className="terms-condition-text-section-number">9. Contacto:</span>
        <p className="terms-condition-text-paragraph">
          a. Si tienes alguna pregunta o inquietud sobre estos Términos, puedes
          contactarnos en [Correo electrónico de contacto].
        </p>
      </div>
    </div>
  );
}

export default TermsConditionText;
