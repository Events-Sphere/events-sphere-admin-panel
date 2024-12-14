import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DisplayUser from "./pages/Users/DisplayUser";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import DisplayUserVerification from "./pages/Users/DisplayVerificationList";
import Login from "./pages/Login/Login";
import AddEvent from "./pages/Events/AddEvent";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import SideMenuBar from "./components/SideMenuBar";
import AddCategory from "./pages/Category/AddCategory";
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
import { useDispatch } from "react-redux";
import { logOut } from "./App/Features/Auth/authSlice";
import Config from "./App/service/config";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "./App/Features/Auth/authSlice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${Config.baseUrl}/auth/validate-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.status;
      }
      return false;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        const isValid = await validateToken(localToken);
        if (isValid) {
          dispatch(setCredentials({ token: localToken }));
        } else {
          dispatch(logOut());
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div className="flex h-screen  items-center justify-center">
          <div className="h-16 w-16 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <NavBar />
          <SideMenuBar />
          <div className="pl-52">
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/categories-list" element={<CategoriesList />} />
                <Route path="/get-all-user" element={<DisplayUser />} />
                <Route
                  path="/get-all-verification-requests"
                  element={<DisplayUserVerification />}
                />
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/organizers" element={<ListOrganizer />} />
                <Route
                  path="/add-internal-team"
                  element={<AddInternalTeam />}
                />
                <Route
                  path="/list-internal-team"
                  element={<InternalTeamList />}
                />
                <Route path="/add-organizer" element={<AddOrganizer />} />
                <Route path="/events/active" element={<ListEvents />} />
                <Route path="/events/pending" element={<ListPendingEvents />} />
                <Route
                  path="/events/rejected"
                  element={<ListRejectedEvents />}
                />
                <Route
                  path="/events/completed"
                  element={<ListCompletedEvents />}
                />
                <Route path="/eventdetail" element={<EventDetail />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
