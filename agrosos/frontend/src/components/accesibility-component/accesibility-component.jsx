import "./accesibility-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function AccesibilityComponent() {

    const navigate = useNavigate();

    return (
        <div id="container-accesibility">
            <div className="arrow-container">
                <button className="accesibility-arrow" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            <h1 className="accesibility-text">Accesibilidad</h1>
            <div className="accesibility-size">
                <p className="accesibility-p">Tamaño del texto</p>
            </div>
            <div className="accesibility-tuto">
                <p className="accesibility-p">Tutorial Aplicación</p>
            </div>
        </div>
    )
}

export default AccesibilityComponent;
