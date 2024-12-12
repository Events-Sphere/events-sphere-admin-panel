import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DisplayUser from "./pages/Users/DisplayUser";
import Dashboard from "./pages/Dashboard/Dashboard";
import './App.css';
import DisplayUserVerification from "./pages/Users/DisplayVerificationList";
import Login from "./pages/Login/Login";
import AddEvent from "./pages/Events/AddEvent";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import SideMenuBar from "./components/SideMenuBar";
import  AddCategory  from "./pages/Category/AddCategory";
import CategoriesList from "./pages/Category/CategoriesList";
import AddInternalTeam from "./pages/Internal Team/AddInternalTeam";
import InternalTeamList from "./pages/Internal Team/InternalTeamList";
import AddOrganizer from "./pages/Organizer/AddOrganizer";
import ListEvents from "./pages/Events/ListEvents";
import EventDetail from "./pages/Events/EventDetail";
import ListPendingEvents from "./pages/Events/ListPendingEvents";
import ListRejectedEvents from "./pages/Events/ListRejectedEvents";
import ListCompletedEvents from "./pages/Events/ListCompletedEvents";
import NotFound from "./pages/NotFound";
import ListOrganizer from "./pages/Organizer/ListOrganizers";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const[loading,setLoading]=useState(false);
  
  if(loading){
    return <div>...loding</div>
  }
  useEffect(()=>{
  },[])
  return (
    <div>
      {
        useSelector((state)=>state.auth.token) ?
        (<><NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
          <SideMenuBar setLoading={setLoading} showMenu={showMenu} setShowMenu={setShowMenu} />
          <div className={localStorage.getItem('token') ? "pl-52" : ''}>
            <Routes>
              <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Navigate to='/dashboard'/>}></Route>
               <Route path="/login" element={<Navigate to='/dashboard'/>}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/add-category" element = {<AddCategory/>}></Route>
              <Route path="/categories-list" element = {<CategoriesList/>}></Route>
              <Route path="/get-all-user" element={<DisplayUser />}></Route>
              <Route path="/get-all-verification-requests" element={<DisplayUserVerification/>}></Route>
              <Route path='/add-event' element={<AddEvent />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/organizers" element={<ListOrganizer />}></Route>
              <Route path='/add-internal-team' element={<AddInternalTeam/>}></Route>
              <Route path='/list-internal-team' element={<InternalTeamList/>}></Route>
              <Route path='/add-organizer' element={<AddOrganizer/>}></Route>
              <Route path='/events/active' element={<ListEvents/>}></Route>
              <Route path='/events/pending' element={<ListPendingEvents/>}></Route>
              <Route path='/events/rejected' element={<ListRejectedEvents/>}></Route>
              <Route path='/events/completed' element={<ListCompletedEvents/>}></Route>
              <Route path='/eventdetail' element={<EventDetail/>}></Route>
              
              <Route path="*" element={<NotFound/>}></Route>
              </Route>
            </Routes>
          </div></>):(
             <Routes>
               <Route path="/" element={<Login setLoading={setLoading} loading={loading} />} />
               <Route path="/login" element={<Login setLoading={setLoading} loading={loading} />} />
               <Route path="*" element={<Navigate to='/login'/>}></Route>
             </Routes>
          )
      }
    </div>
  );
};

export default App;
