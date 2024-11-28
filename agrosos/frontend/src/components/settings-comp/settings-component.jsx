import "./settings-component.css";
import arrow from "./ArrowLeftOutlined.png";

function SettingsComponent() {
    return (
        <div id="container-settings">
            <div className="settings-arrow-container">
                <img src={ arrow } alt="arrow" className="settings-arrow"/>
            </div>
            <h1 className="settings-text">Ajustes</h1>
            <div className="settings-noti">
                <p className="settings-p">Alertas y notificaciones</p>
            </div>
            <div className="settings-export">
                <p className="settings-p">Exportar terrenos</p>
                <div className="settings-ex">
                    <p className="settings-subp">CSV</p>
                    <p className="settings-sub">|</p>
                    <p className="settings-subp">Excel</p>
                </div>
            </div>
            <div className="settings-actu">
                <p className="settings-p">Verificar Actualizaciones</p>
            </div>
            <div className="settings-help">
                <p className="settings-p">Ayuda y soporte</p>
            </div>
        </div>
    )
}

export default SettingsComponent;
