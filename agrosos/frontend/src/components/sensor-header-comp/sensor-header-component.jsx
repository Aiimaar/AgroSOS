import "./sensor-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";

function SensorHeader(){
    return(
        <div className="headerGrey">
        <div className="headerGreyItemContainer">
          <img src={headerGrey} alt="headerGrey" className="headerGreyItem" />
          <p className="header-p">Cultivo</p>
        </div>
        <div className="headerGreyItemContainer">
        <Link to="/sensors"><img
            src={headerGreyBold}
            alt="headerGreyBold"
            className="headerGreyBoldItem"
          /></Link>
          <p className="header-p">Sensores</p>
        </div>
        <div className="headerGreyItemContainer">
        <Link to="/actuators"><img src={headerGrey} alt="headerGrey" className="headerGreyItem" /></Link>
          <p className="header-p">Actuadores</p>
        </div>
      </div>
    )
}

export default SensorHeader;