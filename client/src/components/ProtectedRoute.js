import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireSubscription = false }) => {
  const { user, subscription } = useAuth();
  const location = useLocation();

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If route requires subscription but user doesn't have one
  if (requireSubscription && !subscription) {
    return <Navigate to="/subscribe" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
