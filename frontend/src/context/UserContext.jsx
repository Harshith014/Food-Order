import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((newToken) => {
    const decodedToken = jwtDecode(newToken);
    setToken(newToken);
    setUserId(decodedToken.userId);
    setUserRole(decodedToken.role);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      login(storedToken);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{ token, userId, userRole, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
