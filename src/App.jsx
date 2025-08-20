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
import { Contacto } from "./views/PublicViews/Contact/Contact";
import { Home } from "./views/PublicViews/Home/Home";

// Componente para rutas privadas
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para rutas solo para invitados
const GuestRoute = ({ children }) => {
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
          {/* Redirección raíz a Home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Rutas públicas accesibles siempre */}
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contacto />} />

          {/* Rutas solo para invitados */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
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
              </PrivateRoute>
            }
          />

          {/* Redirección por defecto a Home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
