import "./header-grey-component.css";
import headerGrey from "./image.png";
import { Link } from "react-router-dom";

function SensorHeaderGrey(){
    return(
        <div className="headerGrey">
        <div className="headerGreyItemContainer">
        <Link to="/crops"><img src={headerGrey} alt="headerGrey" className="headerGreyItem" /></Link>
          <p className="header-p">Cultivo</p>
        </div>
        <div className="headerGreyItemContainer">
        <Link to="/sensors"><img
            src={headerGrey}
            alt="headerGrey"
            className="headerGreyItem"
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

export default SensorHeaderGrey;