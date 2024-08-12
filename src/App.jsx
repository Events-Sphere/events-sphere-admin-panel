import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DisplayUser from "./pages/DisplayUser";
import Dashboard from "./pages/Dashboard";
import './App.css';
import DisplayUserVerification from "./pages/DisplayVerificationList";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import SideMenuBar from "./components/SideMenuBar";
import  AddCategory  from "./pages/AddCategory";
import CategoriesList from "./pages/CategoriesList";
import AddInternalTeam from "./pages/AddInternalTeam";
import InternalTeamList from "./pages/InternalTeamList";
import AddOrganizer from "./pages/AddOrganizer";
const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  // const { isAuthenticated } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  
 
  useEffect(()=>{},[token]);

  return (
    <div>
      <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <SideMenuBar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className={token ? "pl-52" : ''}>
        <Routes>
          <Route path="/" element={token ? <Dashboard/> : <Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/add-category" element = {<AddCategory/>}></Route>
          <Route path="/categories-list" element = {<CategoriesList/>}></Route>
          <Route path="/get-all-user" element={<DisplayUser />}></Route>
          <Route path="/get-all-verification-requests" element={<DisplayUserVerification/>}></Route>
          <Route path='/add-event' element={<AddEvent />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path='/add-internal-team' element={<AddInternalTeam/>}></Route>
          <Route path='/list-internal-team' element={<InternalTeamList/>}></Route>
          <Route path='/add-organizer' element={<AddOrganizer/>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
