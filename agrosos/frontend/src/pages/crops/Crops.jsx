import CropsListComponent from "../../components/crops-list/crops-list-component";
import InsideAPlotFooter from "../../components/inside-a-plot-footer-comp/inside-a-plot-footer-comp"
import Header from "../../components/header/header";
import CropsHeaderComponent from "../../components/crops-header-component/crops-header-component";

function Crops() {
  return (
    <>
      <Header />
      <CropsHeaderComponent />
      <CropsListComponent />
      {/* <InsideAPlotFooter /> */}
    </>
  );
}

export default Crops;
