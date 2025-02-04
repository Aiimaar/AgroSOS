import React from "react";
import ActuatorHeader from "../../components/actuator-header-component/actuator-header-component"
import ActuatorEnlaComponent from "../../components/actuator-enla-component/actuator-enla-component"
import Header from "../../components/header/header";

function ActuadorEnla(){
    return(
        <>
            <Header />
            <ActuatorHeader />
            <ActuatorEnlaComponent />
        </>
    )
}

export default ActuadorEnla;