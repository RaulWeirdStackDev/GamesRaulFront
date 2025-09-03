/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 👈 Nuevo: estado de carga

  useEffect(() => {
    // Revisar si ya había sesión guardada
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        // Limpiar datos corruptos
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false); // 👈 Marcar como cargado
  }, []);

  const login = useCallback((userData, tokenData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData);
    setToken(tokenData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // 👈 Añadido: eliminar token también
    setUser(null);
    setToken(null);
  }, []);

  // 👈 Memoizar el valor del contexto para evitar re-renders innecesarios
  const contextValue = useMemo(() => ({
    user,
    token,
    login,
    logout,
    isLoading
  }), [user, token, login, logout, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};