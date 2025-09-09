// CoinQuestFrontend/src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If the initial auth check is still loading, don't render anything
  if (loading) {
    return null;
  }
  
  // If not loading and the user is logged in, redirect them away from the public page
  if (user) {
    return <Navigate to="/vote" replace />;
  }

  // If the user is not logged in, render the public page (e.g., SignIn)
  return children;
};

export default PublicRoute;