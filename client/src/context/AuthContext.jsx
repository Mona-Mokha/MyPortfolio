// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");
    if (token && userName) setUser({ name: userName, role: userRole });
  }, []);

  const login = (token, name, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
    setUser({ name, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
