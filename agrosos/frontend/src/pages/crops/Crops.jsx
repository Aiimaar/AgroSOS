import CropsListComponent from "../../components/crops-list/crops-list-component";
import CropsMenuComponent from "../../components/crops-menu/crops-menu-component";
import InsidePlotFooterComponent from "../../components/inside-plot-footer/inside-plot-footer-component"
import Header from "../../components/header/header";

function Crops() {
  return (
    <>
      <Header />
      <CropsMenuComponent />
      <CropsListComponent />
      <InsidePlotFooterComponent />
    </>
  );
}

export default Crops;
