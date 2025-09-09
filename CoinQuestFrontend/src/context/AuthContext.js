// CoinQuestFrontend/src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt_token') || null);
  const [loading, setLoading] = useState(true); // To check for token on app load

  useEffect(() => {
    // This effect runs once when the app starts
    const storedToken = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken && storedUser) {
      // If a token and user exist from a previous session, restore them
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      // IMPORTANT: Set the token for all future axios requests
      axios.defaults.headers.common['Authorization'] = storedToken;
    }
    
    // Finished checking for token, the app can now render correctly
    setLoading(false); 
  }, []);

  const login = (userData, authToken) => {
    // 1. Store token and user data in localStorage for persistence
    localStorage.setItem('jwt_token', authToken);
    localStorage.setItem('user_data', JSON.stringify(userData));

    // 2. Set the default Authorization header for all subsequent axios requests
    axios.defaults.headers.common['Authorization'] = authToken;

    // 3. Update state to re-render the application
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    // 1. Clear everything from localStorage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');

    // 2. Remove the Authorization header from axios
    delete axios.defaults.headers.common['Authorization'];
    
    // 3. Clear all application state
    setUser(null);
    setToken(null);
  };

  // The value provided to consumers of this context
  const authContextValue = {
    user,
    token,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {/* Render children only after the initial loading check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};