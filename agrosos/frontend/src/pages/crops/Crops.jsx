import CropsListComponent from "../../components/crops-list/crops-list-component";
import CropsMenuComponent from "../../components/crops-menu/crops-menu-component";
import InsideAPlotFooter from "../../components/inside-a-plot-footer-comp/inside-a-plot-footer-comp"
import Header from "../../components/header/header";

function Crops() {
  return (
    <>
      <Header />
      <CropsMenuComponent />
      <CropsListComponent />
      <InsideAPlotFooter />
    </>
  );
}

export default Crops;
