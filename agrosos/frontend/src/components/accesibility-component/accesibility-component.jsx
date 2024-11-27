import "./accesibility-component.css";
import arrow from "./ArrowLeftOutlined.png";

function AccesibilityComponent() {
    return (
        <div id="container-accesibility">
            <div className="arrow-container">
                <img src={ arrow } alt="arrow" className="accesibility-arrow" />
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
