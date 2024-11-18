import React, { useState } from "react";
import PlotList from "./pages/plot-list/PlotList";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import CreatePlot from "./pages/create-plot/CreatePlot";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/plot-list" element={<PlotList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-plot" element={<CreatePlot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
