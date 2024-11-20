import React, { useState } from "react";
import PlotList from "./pages/plot-list/PlotList";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import CreatePlot from "./pages/create-plot/CreatePlot";
import Crops from "./pages/crops/crops";
import CropsDetails from "./pages/crops-details/CropsDetails";

import { BrowserRouter, Routes, Route } from "react-router-dom";


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
      </Routes>
    </BrowserRouter>
  )
}

export default App;
