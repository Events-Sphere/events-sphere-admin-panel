import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ListEvents from "./pages/ListEvents";
import EventDetail from "./pages/EventDetail";
import ListPendingEvents from "./pages/ListPendingEvents";
import ListRejectedEvents from "./pages/ListRejectedEvents";
import ListCompletedEvents from "./pages/ListCompletedEvents";
import NotFound from "./pages/NotFound";
import ListOrganizer from "./pages/ListOrganizers";
import ProtectedRoute from "./components/ProtectedRoute";
// import { useSelector } from "react-redux";
import { GiToken } from "react-icons/gi";
const App = () => {
  const [showMenu, setShowMenu] = useState(false);
 const[loading,setLoading]=useState(false);
  // const { token } = useSelector((state) => state.auth.token);

  
  // console.log("app token",token)
  // useEffect(()=>{
  //   if(token){
  //     const tokenPayload = JSON.parse(atob(token.split('.')[1])); 
  // console.log(JSON.stringify(tokenPayload))
  // const currentTime = Date.now() / 1000; // Current time in seconds

  //       if (tokenPayload.exp < currentTime) {
  //         // Token has expired
  //         localStorage.removeItem("token");
  //          // Function to remove token from storage
  //         navigate("/"); // Redirect to login
  //       }
  //   }
  // },[token]);
  // console.log(token)
  
  if(loading){
    return <div>...loding</div>
  }
  
 

  return (
    <div>
      {
        // localStorage.getItem('token') 
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
