import Header from "../../components/header/header";
import SensorEnlaComponent from "../../components/sensor-enla-component/sensor-enla-component";
import SensorHeader from "../../components/sensor-header-comp/sensor-header-component";

function SensorEnla(){
    return(
        <>
            <Header />
            <SensorHeader />
            <SensorEnlaComponent />
        </>
    )
}

export default SensorEnla;