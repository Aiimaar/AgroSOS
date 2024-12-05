import React from "react";
import PlotList from "./pages/plot-list/PlotList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePlot from "./pages/create-plot/CreatePlot";
import CreatePlots from "./pages/create-plots/CreatePlots";
import TermsConditionsPage from "./pages/terms-conditions-page/TermsConditionPage";
import Sensors from "./pages/sensors/Sensors";
import AddSensor from "./pages/add-sensor/AddSensor";
import SensorEnla from "./pages/sensor-enla/SensorEnla";
import Actuators from "./pages/actuators/Actuators";
import Accesibility from "./pages/accesibility/Accesibility";
import ActuadorEnla from "./pages/actuator-enla/ActuatorEnla";
import UserProfile from "./pages/user-profile/UserProfile";
import InsideAPlot from "./pages/inside-a-plot/InsideAPlot";
import AddActuator from "./pages/add-actuator/AddActuator";
import Settings from "./pages/settings/Settings";
import ExistingRules from "./pages/existing-rules/ExistingRules";
import Temperature from "./pages/temperature/Temperature";
import Humidity from "./pages/humidity/Humidity";
import AdminUserCrud from "./pages/admin-crud/AdminCrud";
import SustainabilityAndEnvironmentManagement from "./pages/sustainability-and-environment/SustainabilityAndEnvironment";
import SoilManagement from "./pages/soil-management/SoilManagement";
import Advices from "./pages/advices/Advices";
import CropManagement from "./pages/crop-management/CropManagement";
import EfficiencyEnergy from "./pages/efficiency-energy/EfficiencyEnergy";
import RulesPages from "./pages/rules-page/RulesPage";
import CropsDetails from "./pages/crops-details/CropsDetails";
import Crops from "./pages/crops/Crops";
import AddRule from "./pages/add-rule/AddRule";
import { SensorProvider } from "./context/SensorContext";
import { ActuatorProvider } from "./context/ActuatorContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCrop from "./pages/create-crops/CreateCrops";

function App() {
  return (
    <ActuatorProvider>
      <SensorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/plot-list" element={<PlotList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-plot" element={<CreatePlot />} />
            <Route path="/create-plots" element={<CreatePlots />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/add-sensor" element={<AddSensor />} />
            <Route path="/sensor-enla" element={<SensorEnla />} />
            <Route path="/actuators" element={<Actuators />} />
            <Route path="/actuator-enla" element={<ActuadorEnla />} />
            <Route path="/add-actuator/:actuatorName" element={<AddActuator />} />
            <Route path="/accesibility" element={<Accesibility />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/existing-rules" element={<ExistingRules />} />
            <Route path="/temperature" element={<Temperature />} />
            <Route path="/humidity" element={<Humidity />} />
            <Route path="/user-profile" element={<UserProfile/>} />
            <Route path="/inside-a-plot" element={<InsideAPlot/>} />
            <Route path="/admin-user-crud" element={<AdminUserCrud />} />
            <Route path="/sustainability" element={<SustainabilityAndEnvironmentManagement />} />
            <Route path="/soil-management" element={<SoilManagement />} />
            <Route path="/advices" element={<Advices />} />
            <Route path="/crop-management" element={<CropManagement />} />
            <Route path="/energy-efficiency" element={<EfficiencyEnergy />} />
            <Route path="/rules" element={<RulesPages />} />
            <Route path="/crop-details" element={<CropsDetails />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/add-rule" element={<AddRule />} />
            <Route path="/create-crop" element={<CreateCrop />} />
          </Routes>
        </BrowserRouter>
      </SensorProvider>
    </ActuatorProvider>
  );
}

export default App;
