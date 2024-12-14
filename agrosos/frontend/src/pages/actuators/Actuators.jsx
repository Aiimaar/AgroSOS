import ActuatorContentComponent from "../../components/actuator-content-component/actuator-content-component";
import ActuatorHeaderComponent from "../../components/actuator-header-component/actuator-header-component";
import Header from "../../components/header/header";

function Actuators(){
    return(
        <>
            <Header />
            <ActuatorHeaderComponent />
            <ActuatorContentComponent />
        </>
    )
}

export default Actuators;