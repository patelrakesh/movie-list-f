import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially not logged in

  const login = () => {
    // Logic to set authentication status
    setIsLoggedIn(true);
    // No need to set token here; it's already set in the SignUp component
  };

  const logout = () => {
    // Logic to log the user out, clear token, and reset authentication status
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token from local storage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
