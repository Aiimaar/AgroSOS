import CropsMenuComponent from "../../components/crops-menu/crops-menu-component";
import Header from "../../components/header/header";
import InsideAPlotComp from "../../components/inside-a-plot-comp/inside-a-plot-comp";
import InsideAPlotFooter from "../../components/inside-a-plot-footer-comp/inside-a-plot-footer-comp";
import SensorHeader from "../../components/sensor-header-comp/sensor-header-component";

function InsideAPlot(){
    return (
        <>
            <Header />
            <SensorHeader />
            <InsideAPlotComp />
            {/* <InsideAPlotFooter /> */}
        </>
    )
}

export default InsideAPlot;
