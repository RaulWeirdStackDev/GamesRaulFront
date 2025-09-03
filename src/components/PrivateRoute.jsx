import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  const { token } = useAuth(); // usamos token del contexto

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza los hijos
  return children;
};
