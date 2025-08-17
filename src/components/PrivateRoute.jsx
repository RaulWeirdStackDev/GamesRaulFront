
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
