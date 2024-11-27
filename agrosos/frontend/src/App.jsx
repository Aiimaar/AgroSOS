import React from "react";
import PlotList from "./pages/plot-list/PlotList";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import CreatePlot from "./pages/create-plot/CreatePlot";
import CreatePlots from "./pages/create-plots/CreatePlots";
import TermsConditions from "./pages/terms-conditions/TermsCondition";
import Sensors from "./pages/sensors/Sensors";
import AddSensor from "./pages/add-sensor/AddSensor";
import SensorEnla from "./pages/sensor-enla/SensorEnla";
import Actuators from "./pages/actuators/Actuators";
import Accesibility from "./pages/accesibility/Accesibility";
import ActuadorEnla from "./pages/actuator-enla/ActuatorEnla";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddActuator from "./pages/add-actuator/AddActuator";
import { SensorProvider } from "./context/SensorContext";
import Settings from "./pages/settings/Settings";
import { ActuatorProvider } from "./context/ActuatorContext";
import ExistingRules from "./pages/existing-rules/ExistingRules";
import Temperature from "./pages/temperature/Temperature";
import Humidity from "./pages/humidity/Humidity";
import IrrigationFrecuency from "./pages/irrigation-frecuency/IrrigationFrecuency";

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
            <Route path="/terms-conditions" element={<TermsConditions />} />
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
            <Route path="/irrigation-frecuency" element={<IrrigationFrecuency />} />
          </Routes>
        </BrowserRouter>
      </SensorProvider>
    </ActuatorProvider>
  );
}

export default App;
