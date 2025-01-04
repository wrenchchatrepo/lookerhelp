import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingState from './LoadingState';

const ProtectedRoute = ({ 
  children, 
  requireSubscription = false,
  isLoading = false,
  isAuthenticated = false,
  hasSubscription = false 
}) => {
  const location = useLocation();

  if (isLoading) {
    return <LoadingState message="Verifying access..." />;
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the attempted path
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireSubscription && !hasSubscription) {
    // Redirect to pricing if subscription is required but user doesn't have one
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
