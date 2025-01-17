import "./header-grey-component.css";
import headerGrey from "./image.png";
import { Link } from "react-router-dom";

function SensorHeaderGrey() {
    return (
        <div className="headerGrey-inside-a-plot" role="region" aria-label="Opciones de sensores y actuadores">
            <div className="headerGreyItemContainer">
                <Link to="/crops" aria-label="Ir a Cultivo">
                    <img
                        src={headerGrey}
                        alt="Imagen representativa de Cultivo"
                        className="headerGreyItem"
                    />
                </Link>
                <p className="header-p">Cultivo</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/sensors" aria-label="Ir a Sensores">
                    <img
                        src={headerGrey}
                        alt="Imagen representativa de Sensores"
                        className="headerGreyItem"
                    />
                </Link>
                <p className="header-p">Sensores</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/actuators" aria-label="Ir a Actuadores">
                    <img
                        src={headerGrey}
                        alt="Imagen representativa de Actuadores"
                        className="headerGreyItem"
                    />
                </Link>
                <p className="header-p">Actuadores</p>
            </div>
        </div>
    );
}

export default SensorHeaderGrey;
