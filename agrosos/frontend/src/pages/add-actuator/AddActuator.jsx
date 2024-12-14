import ActuatorHeader from "../../components/actuator-header-component/actuator-header-component";
import AddActuatorContentComponent from "../../components/add-actuator-content/add-actuator-content-component";
import Header from "../../components/header/header";

function AddActuator(){
    return(
        <>
            <Header />
            <ActuatorHeader />
            <AddActuatorContentComponent />
        </>
    )
}

export default AddActuator;