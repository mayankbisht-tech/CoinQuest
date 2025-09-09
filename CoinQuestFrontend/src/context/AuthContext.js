
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt_token') || null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common['Authorization'] = storedToken;
    }
    
    setLoading(false); 
  }, []);

  const login = (userData, authToken) => {
    localStorage.setItem('jwt_token', authToken);
    localStorage.setItem('user_data', JSON.stringify(userData));

    axios.defaults.headers.common['Authorization'] = authToken;

    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');

    delete axios.defaults.headers.common['Authorization'];
    
    setUser(null);
    setToken(null);
  };

  const authContextValue = {
    user,
    token,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};