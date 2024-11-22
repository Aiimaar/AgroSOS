import AddPlotComponent from "../../components/add-plot-component/add-plot-component";
import Cultive from "../../components/cultive-component/cultive-component";
import Header from "../../components/create-plots-header-component/create-plots-header-component";

function AddPlot(){
    return(
        <>
            <Header/>
            <AddPlotComponent />
            <Cultive />
        </>
    )
}

export default AddPlot;