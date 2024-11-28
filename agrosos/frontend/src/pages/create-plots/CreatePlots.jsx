import AddPlotComponent from "../../components/add-plot-component/add-plot-component";
import Cultive from "../../components/cultive-component/cultive-component";
import HeaderImageOnly from "../../components/header-image-only/header-image-only";

function AddPlot(){
    return(
        <>
            <HeaderImageOnly />
            <AddPlotComponent />
            <Cultive />
        </>
    )
}

export default AddPlot;