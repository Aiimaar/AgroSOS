import "./sensor-header-component.css";
import headerGrey from "./image.png";
import headerGreyBold from "./image-bold.png";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Usamos el hook useTranslation para obtener las traducciones

function SensorHeader() {
    const { t } = useTranslation(); // Obtenemos la función t para traducir

    return (
        <div className="headerGrey" aria-label={t("sensor_navigation")}>
            <div className="headerGreyItemContainer">
                <Link to="/crops" aria-label={t("go_to_crops_page")}>
                    <img
                        src={headerGrey}
                        alt={t("crops_page_icon")}
                        className="headerGreyItem"
                        aria-hidden="true"
                    />
                </Link>
                <p className="header-p" aria-hidden="true">{t("crops")}</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/inside-a-plot" aria-label={t("go_to_sensors_page")}>
                    <img
                        src={headerGreyBold}
                        alt={t("highlighted_sensors_page_icon")}
                        className="headerGreyBoldItem"
                        aria-hidden="true"
                    />
                </Link>
                <p className="header-p">{t("sensors")}</p>
            </div>
            <div className="headerGreyItemContainer">
                <Link to="/actuators" aria-label={t("go_to_actuators_page")}>
                    <img
                        src={headerGrey}
                        alt={t("actuators_page_icon")}
                        className="headerGreyItem"
                        aria-hidden="true"
                    />
                </Link>
                <p className="header-p" aria-hidden="true">{t("actuators")}</p>
            </div>
        </div>
    );
}

export default SensorHeader;
