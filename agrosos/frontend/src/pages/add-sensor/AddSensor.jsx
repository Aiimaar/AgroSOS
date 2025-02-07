import React from "react";
import AddSensorContent from "../../components/add-sensor-content/add-sensor-content-component";
import Header from "../../components/header/header";
import SensorHeader from "../../components/sensor-header-comp/sensor-header-component";

function AddSensor(){
    return(
        <>
            <Header />
            <SensorHeader />
            <AddSensorContent />
        </>
    )
}

export default AddSensor;