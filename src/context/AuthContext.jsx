/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Función para limpiar datos de autenticación
  const clearAuthData = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }, []);

  // ✅ Función para verificar si el token es válido
  const verifyToken = useCallback(async (tokenToVerify) => {
    try {
      const response = await fetch("http://localhost:3007/api/auth/verify", {
        headers: { Authorization: `Bearer ${tokenToVerify}` }
      });
      return response.ok;
    } catch (error) {
      console.error("Error verifying token:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    const checkAuthState = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        try {
          // ✅ Verificar si el token sigue siendo válido
          const isValid = await verifyToken(storedToken);
          
          if (isValid) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
          } else {
            // Token expirado o inválido - limpiar
            clearAuthData();
          }
        } catch (error) {
          console.error("Error parsing stored user:", error);
          clearAuthData();
        }
      }
      setIsLoading(false);
    };

    checkAuthState();
  }, [verifyToken, clearAuthData]);

  const login = useCallback((userData, tokenData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData);
    setToken(tokenData);
  }, []);

  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  // ✅ Función para hacer logout automático cuando el token expire
  const handleTokenExpiration = useCallback(() => {
    clearAuthData();
    // Opcional: mostrar mensaje al usuario
    // import Swal from "sweetalert2";
    // Swal.fire("Sesión expirada", "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.", "warning");
  }, [clearAuthData]);

  const contextValue = useMemo(() => ({
    user,
    token,
    login,
    logout,
    isLoading,
    handleTokenExpiration, // ✅ Exponer para usar en peticiones
    verifyToken
  }), [user, token, login, logout, isLoading, handleTokenExpiration, verifyToken]);

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