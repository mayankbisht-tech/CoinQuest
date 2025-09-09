// CoinQuestFrontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If the initial auth check is still loading, don't render anything
  if (loading) {
    return null; 
  }

  // If not loading and there's no user, redirect to the sign-in page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  // If the user is authenticated, render the requested component
  return children;
};

export default ProtectedRoute;