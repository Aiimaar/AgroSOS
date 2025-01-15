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
                        <img src={headerGrey} alt="Cultivo" className="headerGreyItem" />
                    </Link>
                    <p className="header-p">Cultivo</p>
                </div>
                <div className="headerGreyItemContainer">
                    <Link to="/sensors" aria-label="Ir a Sensores">
                        <img
                            src={headerGrey}
                            alt="Sensores"
                            className="headerGreyBoldItem"
                        />
                    </Link>
                    <p className="header-p">Sensores</p>
                </div>
                <div className="headerGreyItemContainer">
                    <Link to="/inside-a-plot" aria-label="Ir a Actuadores">
                        <img src={headerGreyBold} alt="Actuadores" className="headerGreyItem" />
                    </Link>
                    <p className="header-p">Actuadores</p>
                </div>
            </div>
        </div>
    )
}

export default ActuatorHeaderComponent;
