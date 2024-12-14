import PlotListComp from "../../components/plot-list-comp/plot-list-comp";
import Header from "../../components/header/header";
import PlotListFooterComp from "../../components/plot-list-footer-comp/plot-list-footer-comp";

function PlotList(){
    return (
        <>
            <Header />
            <PlotListComp />
            <PlotListFooterComp />
        </>
    )
}

export default PlotList;