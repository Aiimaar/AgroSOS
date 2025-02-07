import React from 'react';
import CreatePlotForm from "../../components/createplot-form/createplot-form-component";
import HeaderImageOnly from "../../components/header-image-only/header-image-only";

function CreatePlot(){
    return (
        <>
            <HeaderImageOnly />
            <CreatePlotForm />
        </>
    )
}

export default CreatePlot;