import "./accesibility-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

    return (
        <div id="container-accesibility">
            <div className="arrow-container">
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
            </div>
        </div>
    );
}

export default AccesibilityComponent;
