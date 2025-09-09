import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import axios from 'axios'; 

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [teams, setTeams] = useState([]);
  const [votedFor, setVotedFor] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken && storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
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
    setTeams([]);
    setVotedFor(null);
  };

  const authContextValue = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    teams,
    setTeams,
    votedFor,
    setVotedFor,
  }), [user, token, loading, teams, votedFor]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};