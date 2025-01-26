import "./sensor-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";

function SensorHeader(){
    return(
        <div className="headerGrey" aria-label="Navegación de sensores">
            <div className="headerGreyItemContainer">
                <Link to="/crops" aria-label="Ir a la página de Cultivo">
                    <img src={headerGrey} alt="Icono para la página de Cultivo" className="headerGreyItem" aria-hidden="true" />
                </Link>
                <p className="header-p" aria-hidden="true">Cultivo</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/inside-a-plot" aria-label="Ir a la página de Sensores">
                    <img
                        src={headerGreyBold}
                        alt="Icono destacado para la página de Sensores"
                        className="headerGreyBoldItem"
                        aria-hidden="true"
                    />
                </Link>
                <p className="header-p">Sensores</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/actuators" aria-label="Ir a la página de Actuadores">
                    <img src={headerGrey} alt="Icono para la página de Actuadores" className="headerGreyItem" aria-hidden="true" />
                </Link>
                <p className="header-p" aria-hidden="true">Actuadores</p>
            </div>
        </div>
    )
}

export default SensorHeader;
