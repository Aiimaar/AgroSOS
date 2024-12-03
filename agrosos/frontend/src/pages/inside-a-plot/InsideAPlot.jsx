import CropsMenuComponent from "../../components/crops-menu/crops-menu-component";
import SensorHeaderGrey from "../../components/header-grey-component/header-grey-component";
import Header from "../../components/header/header";
import InsideAPlotComp from "../../components/inside-a-plot-comp/inside-a-plot-comp";
import InsideAPlotFooter from "../../components/inside-a-plot-footer-comp/inside-a-plot-footer-comp";

function InsideAPlot(){
    return (
        <>
            <Header />
            <SensorHeaderGrey />
            <InsideAPlotComp />
            {/* <InsideAPlotFooter /> */}
        </>
    )
}

export default InsideAPlot;
