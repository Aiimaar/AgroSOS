import React, { useState } from "react";
import PlotList from "./pages/plot-list/PlotList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePlot from "./pages/create-plot/CreatePlot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./pages/user-profile/UserProfile";
import InsideAPlotComp from "./components/inside-a-plot-comp/inside-a-plot-comp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/plot-list" element={<PlotList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-plot" element={<CreatePlot />} />
        <Route path="/user-profile" element={<UserProfile/>} />
        <Route path="/inside-a-plot" element={<InsideAPlotComp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
