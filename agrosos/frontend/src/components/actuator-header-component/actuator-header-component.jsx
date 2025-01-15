import "./actuator-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";

function ActuatorHeaderComponent(){
    return(
        <div id="actuator-header-container" role="banner">
            <div className="headerGrey">
                <div className="headerGreyItemContainer">
                    <Link to="/crops" aria-label="Ir a Cultivos">
                        <img 
                            src={headerGrey} 
                            alt="Icono representando cultivo" 
                            className="headerGreyItem" 
                        />
                    </Link>
                    <p className="header-p">Cultivo</p>
                </div>
                <div className="headerGreyItemContainer" aria-label="Ir a Sensores">
                    <Link to="/sensors">
                        <img
                            src={headerGrey}
                            alt="Icono representando sensores"
                            className="headerGreyBoldItem"
                        />
                    </Link>
                    <p className="header-p">Sensores</p>
                </div>
                <div className="headerGreyItemContainer" aria-label="Ir a Actuadores">
                    <Link to="/inside-a-plot">
                        <img 
                            src={headerGreyBold} 
                            alt="Icono representando actuadores" 
                            className="headerGreyItem" 
                        />
                    </Link>
                    <p className="header-p">Actuadores</p>
                </div>
            </div>
        </div>
    )
}

export default ActuatorHeaderComponent;
