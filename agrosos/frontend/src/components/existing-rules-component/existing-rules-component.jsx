import arrow from "./ArrowLeftOutlined.png";
import add from "./plusCircleOutlined.png";
import "./existing-rules-component.css";

function ExistingRulesComponent() {
  return (
    <div id="existing-rules-container">
      <div className="existing-rules-arrow-container">
        <img src={arrow} alt="arrow" className="existing-rules-arrow" />
      </div>
      <h1 className="existing-rules-text">Reglas existentes</h1>
        <div className="existing-rules-add">
            <p className="existing-rules-p">Añadir una regla</p>
            <img src={add} alt="add" className="existing-rules-add-img"/>
        </div>
    </div>
  );
}

export default ExistingRulesComponent;
