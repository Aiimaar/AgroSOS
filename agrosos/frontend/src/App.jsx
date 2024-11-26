import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlotList from "./pages/plot-list/PlotList";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import CreatePlot from "./pages/create-plot/CreatePlot";
import Crops from "./pages/crops/crops";
import CropsDetails from "./pages/crops-details/CropsDetails";
import Advices from "./pages/advices/Advices";
import SoilManagement from "./pages/soil-management/SoilManagement";
import CropManagement from "./pages/crop-management/CropManagement";
import SustainabilityAndEnvironmentanagement from "./pages/sustainability-and-environment/SustainabilityAndEnvironment";
import EfficiencyEnergy from "./pages/efficiency-energy/EfficiencyEnergy";
import AdminCrud from "./pages/admin-crud/AdminCrud";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/plot-list" element={<PlotList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-plot" element={<CreatePlot />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/crops-details" element={<CropsDetails />} />
        <Route path="/advices" element={<Advices />} />
        <Route path="/soil-management" element={<SoilManagement />} />
        <Route path="/crop-management" element={<CropManagement />} />
        <Route path="/sustainability-and-enviroment" element={<SustainabilityAndEnvironmentanagement />} />
        <Route path="/efficiency-energy" element={<EfficiencyEnergy />} />

        <Route path="/admin-crud" element={<AdminCrud />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
