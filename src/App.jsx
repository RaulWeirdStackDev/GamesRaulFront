/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Vistas
import { Register } from "./views/PublicViews/Register/Register";
import { Login } from "./views/PublicViews/Login/Login";
import { Games } from "./views/PrivateViews/Games/Games";
import { Profile } from "./views/PrivateViews/Profile/Profile";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Componente para rutas privadas
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para rutas públicas (ej: login o register) que no deberían verse si ya hay usuario logueado
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/games" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Rutas privadas */}
          <Route
            path="/games"
            element={
              <PrivateRoute>
                <Games />
              </PrivateRoute>
            }
          />
          <Route
  path="/profile/:userId"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>}
/>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
