import React from 'react';
import SensorHeader from "../../components/sensor-header-comp/sensor-header-component";
import SensorContent from "../../components/sensor-content-comp/sensor-content-component";
import Header from "../../components/header/header";

function Sensors(){
    return(
        <>
            <Header />
            <SensorHeader />
            <SensorContent />
        </>
    )
}

export default Sensors;