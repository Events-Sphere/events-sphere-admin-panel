import React, { useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DisplayUser from "./pages/DisplayUser";
import Dashboard from "./pages/Dashboard";
import './App.css';
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";

import NavBar from "./components/NavBar";
import SideMenuBar from "./components/SideMenuBar";
const App = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div>
      <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <SideMenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="pl-52">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/get-all-user" element={<DisplayUser />}></Route>
          <Route path='/add-event' element={<AddEvent />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
