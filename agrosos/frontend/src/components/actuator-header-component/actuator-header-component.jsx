import "./actuator-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";
import { useDarkMode } from '../../context/DarkModeContext'; // Asegúrate de ajustar la ruta según tu estructura de archivos

function ActuatorHeaderComponent() {
  const { darkMode } = useDarkMode(); // Usar el modo oscuro desde el contexto

  return (
    <div id="actuator-header-container" className={darkMode ? 'dark-mode' : ''}>
      <div className="headerGrey">
        <div className="headerGreyItemContainer">
          <Link to="/crops">
            <img src={headerGrey} alt="headerGrey" className="headerGreyItem" />
          </Link>
          <p className="header-p">Cultivo</p>
        </div>
        <div className="headerGreyItemContainer">
          <Link to="/sensors">
            <img
              src={headerGrey}
              alt="headerGreyBold"
              className="headerGreyBoldItem"
            />
          </Link>
          <p className="header-p">Sensores</p>
        </div>
        <div className="headerGreyItemContainer">
          <Link to="/inside-a-plot">
            <img src={headerGreyBold} alt="headerGrey" className="headerGreyItem" />
          </Link>
          <p className="header-p">Actuadores</p>
        </div>
      </div>
    </div>
  );
}

export default ActuatorHeaderComponent;
