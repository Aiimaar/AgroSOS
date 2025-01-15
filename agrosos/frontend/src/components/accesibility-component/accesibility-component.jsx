import "./accesibility-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function AccesibilityComponent() {
    const navigate = useNavigate();

    return (
        <div id="container-accesibility" role="main" aria-labelledby="accesibility-title">
            <div className="arrow-container">
                <button
                    className="accesibility-arrow"
                    onClick={() => navigate(-1)}
                    aria-label="Volver"
                >
                    <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                </button>
            </div>
            <h1
                id="accesibility-title"
                className="accesibility-text"
            >
                Accesibilidad
            </h1>
            <div className="accesibility-size">
                <p
                    className="accesibility-p"
                    id="text-size-label"
                    role="note"
                >
                    Tamaño del texto
                </p>
            </div>
            <div className="accesibility-tuto">
                <p
                    className="accesibility-p"
                    id="app-tutorial-label"
                    role="note"
                >
                    Tutorial Aplicación
                </p>
            </div>
        </div>
    );
}

export default AccesibilityComponent;
