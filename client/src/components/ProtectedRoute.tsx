import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');

  // If the token is not present, redirect to the signin page
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;