import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    console.log('protected route',token)
  return token?<Outlet/>:<Navigate to='/login'/>;
}

export default ProtectedRoute