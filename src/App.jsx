 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Vistas
import { Register } from "./views/PublicViews/Register/Register";
import { Login } from "./views/PublicViews/Login/Login";
import { Games } from "./views/PrivateViews/Games/Games";
import { Profile } from "./views/PrivateViews/Profile/Profile";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Contacto } from "./views/PublicViews/Contact/Contact";
import { Home } from "./views/PublicViews/Home/Home";
import { ScrollToTop } from "./components/ScrollToTop";
import { About } from "./views/PublicViews/About/About";

// 🔥 NUEVAS IMPORTACIONES - Rutas de recuperación de contraseña
import { ForgotPassword } from "./views/PublicViews/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./views/PublicViews/ResetPassword/ResetPassword";



function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          {/* Redirección raíz a Home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Rutas públicas accesibles siempre */}
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="/about" element={<About />} />

          {/* Rutas solo para invitados */}
          <Route
            path="/login"
            element={
       
                <Login />

            }
          />
          <Route
            path="/register"
            element={

                <Register />

            }
          />

          {/* 🔥 NUEVAS RUTAS - Recuperación de contraseña (solo para invitados) */}
          <Route
            path="/forgot-password"
            element={
 
                <ForgotPassword />
   
            }
          />
          <Route
            path="/reset-password/:token"
            element={

                <ResetPassword />

            }
          />

          {/* Rutas privadas */}
          <Route
            path="/games"
            element={

                <Games />

            }
          />
          <Route
            path="/profile/"
            element={

                <Profile />

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