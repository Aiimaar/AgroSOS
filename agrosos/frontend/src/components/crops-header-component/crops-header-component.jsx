import "./crops-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";

function CropsHeaderComponent(){
    return(
        <div className="headerGrey">
            <div className="headerGreyItemContainer">
                <Link to="/inside-a-plot">
                    <img 
                        src={headerGreyBold} 
                        alt="Imagen destacada para Cultivo"
                        className="headerGreyItem" 
                    />
                </Link>
                <p className="header-p">Cultivo</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/sensors">
                    <img
                        src={headerGrey}
                        alt="Imagen representativa de Sensores"
                        className="headerGreyBoldItem"
                    />
                </Link>
                <p className="header-p">Sensores</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/actuators">
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

export default CropsHeaderComponent;
