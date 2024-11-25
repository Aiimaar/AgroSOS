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
import ActuadorEnla from "./pages/actuator-enla/ActuatorEnla";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddActuator from "./pages/add-actuator/AddActuator";
import { SensorProvider } from "./context/SensorContext";
import { ActuatorProvider } from "./context/ActuatorContext";

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
          </Routes>
        </BrowserRouter>
      </SensorProvider>
    </ActuatorProvider>
  );
}

export default App;
