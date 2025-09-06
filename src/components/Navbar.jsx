import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Ruta corregida
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { apiRequest } from "../utils/apiClient"; // ✅ Ruta corregida

export const Navbar = () => {
  const { user, token, logout, handleTokenExpiration } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const dropdownRef = useRef(null);

  // Debug: Log cuando cambie el user
  useEffect(() => {
    console.log("👤 Navbar - User cambió:", user ? `Logueado: ${user.name}` : "No logueado");
  }, [user]);

  // ✅ Obtener foto de perfil con manejo de token expirado
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!token || !user) { // ✅ Verificar tanto token como user
        setProfilePhoto(""); // ✅ Limpiar foto si no hay usuario
        return;
      }
      
      try {
        const response = await apiRequest(
          "http://localhost:3007/api/profile/me",
          {
            method: "GET"
          },
          handleTokenExpiration // ✅ Pasar la función para manejar expiración
        );

        if (!response.ok) {
          // Si es 401/403, apiRequest ya manejó la expiración
          if (response.status === 401 || response.status === 403) {
            return; // No hacer nada más, el token ya se limpió
          }
          setProfilePhoto("");
          return;
        }

        const data = await response.json();
        setProfilePhoto(data.photo || "");
      } catch (err) {
        console.error("Error fetching profile photo:", err);
        setProfilePhoto("");
      }
    };

    fetchProfilePhoto();
  }, [token, user, handleTokenExpiration]); // ✅ Agregar user a dependencias

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setProfilePhoto("");
    navigate("/login", { replace: true });
  };

  const activeClass = (path) => {
    const currentPath = location.pathname === "/" ? "/home" : location.pathname;
    return currentPath === path
      ? "relative bg-gradient-to-r from-blue-700 to-gray-700 text-white shadow-lg transform scale-105 font-bold px-6 py-2 mx-1 rounded-xl transition-all duration-300"
      : "relative text-gray-300 hover:text-white hover:bg-gray-800/10 hover:scale-105 hover:shadow-lg font-semibold px-6 py-2 mx-1 rounded-xl transition-all duration-300 backdrop-blur-sm";
  };

  const mobileActiveClass = (path) => {
    const currentPath = location.pathname === "/" ? "/home" : location.pathname;
    return currentPath === path
      ? "block w-full bg-gradient-to-r from-blue-700 to-gray-700 text-white shadow-lg font-bold px-4 py-3 rounded-xl transition-all duration-300 text-center"
      : "block w-full text-gray-300 hover:text-white hover:bg-gray-800/30 font-semibold px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm text-center";
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-600/20 shadow-2xl relative z-50">
      <div className="relative flex items-center justify-between py-3 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/logo.png" className="h-18 sm:h-20" alt="Logo" />
        </Link>

        {/* Texto central (oculto en móvil) */}
        <div className="hidden md:flex flex-1 justify-center">
          <p className="text-gray-300 text-lg">
            <span className="bg-gradient-to-r from-blue-50 to-gray-100 bg-clip-text text-transparent">
              Cambiando el mundo un juego a la vez
            </span>
          </p>
        </div>

        {/* Links (desktop) */}
        <div className="hidden md:flex items-center text-base flex-shrink-0">
          <Link to="/home" className={activeClass("/home")}>Inicio</Link>
          <Link to="/about" className={activeClass("/about")}>Sobre Mí</Link>
          <Link to="/contact" className={activeClass("/contact")}>Contacto</Link>

          {!user ? (
            <>
              <Link to="/login" className={activeClass("/login")}>Iniciar Sesión</Link>
              <Link to="/register" className={activeClass("/register")}>Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/games" className={activeClass("/games")}>Juegos</Link>

              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-gray-600/20 rounded-xl px-3 py-1.5 text-white"
                >
                  <img
                    src={profilePhoto || "/default-avatar.png"}
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover border-2 border-blue-600/30"
                    onError={(e) => { e.target.src = "/default-avatar.png"; }}
                  />
                  <span className="font-semibold text-sm hidden sm:block">{user?.username || user?.name}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-gray-900/95 backdrop-blur-xl border border-gray-600/20 rounded-2xl shadow-2xl text-white z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-800/10"
                      onClick={() => setProfileOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left hover:bg-red-500/10 hover:text-red-400"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Botón menú móvil */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-600/20 shadow-xl px-4 py-4">
          <div className="space-y-3">
            <Link to="/home" className={mobileActiveClass("/home")} onClick={() => setMobileOpen(false)}>
              Inicio
            </Link>
            <Link to="/about" className={mobileActiveClass("/about")} onClick={() => setMobileOpen(false)}>
              Sobre Mí
            </Link>
            <Link to="/contact" className={mobileActiveClass("/contact")} onClick={() => setMobileOpen(false)}>
              Contacto
            </Link>

            {!user ? (
              <>
                <Link to="/login" className={mobileActiveClass("/login")} onClick={() => setMobileOpen(false)}>
                  Iniciar Sesión
                </Link>
                <Link to="/register" className={mobileActiveClass("/register")} onClick={() => setMobileOpen(false)}>
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                <Link to="/games" className={mobileActiveClass("/games")} onClick={() => setMobileOpen(false)}>
                  Juegos
                </Link>
                
                {/* Perfil con información del usuario en móvil */}
                <div className="border-t border-gray-600/30 pt-3 mt-3">
                  <div className="flex items-center justify-center space-x-3 mb-3 px-4 py-2">
                    <img
                      src={profilePhoto || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-600/30"
                      onError={(e) => { e.target.src = "/default-avatar.png"; }}
                    />
                    <span className="font-semibold text-white text-sm">
                      {user?.username || user?.name}
                    </span>
                  </div>
                  
                  <Link to="/profile" className={mobileActiveClass("/profile")} onClick={() => setMobileOpen(false)}>
                    Mi Perfil
                  </Link>
                  
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="block w-full text-red-400 hover:bg-red-500/20 hover:text-red-300 font-semibold px-4 py-3 rounded-xl transition-all duration-300 text-center mt-3"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};