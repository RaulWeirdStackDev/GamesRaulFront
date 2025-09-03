import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react"; // 👈 iconos para móvil

export const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // 👈 estado para menú móvil
  const [profilePhoto, setProfilePhoto] = useState("");
  const dropdownRef = useRef(null);

  // Obtener foto de perfil
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3007/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setProfilePhoto("");
          return;
        }
        const data = await res.json();
        setProfilePhoto(data.photo || "");
      } catch (err) {
        console.error("Error fetching profile photo:", err);
        setProfilePhoto("");
      }
    };
    fetchProfilePhoto();
  }, [token]);

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

  return (
    <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-600/20 shadow-2xl relative z-50">
      <div className="relative flex items-center justify-between py-3 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/logo.png" className="h-14 sm:h-20" alt="Logo" />
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
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-600/20 shadow-xl px-4 py-3 space-y-2">
          <Link to="/home" className={activeClass("/home")} onClick={() => setMobileOpen(false)}>Inicio</Link>
          <Link to="/about" className={activeClass("/about")} onClick={() => setMobileOpen(false)}>Sobre Mí</Link>
          <Link to="/contact" className={activeClass("/contact")} onClick={() => setMobileOpen(false)}>Contacto</Link>

          {!user ? (
            <>
              <Link to="/login" className={activeClass("/login")} onClick={() => setMobileOpen(false)}>Iniciar Sesión</Link>
              <Link to="/register" className={activeClass("/register")} onClick={() => setMobileOpen(false)}>Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/games" className={activeClass("/games")} onClick={() => setMobileOpen(false)}>Juegos</Link>
              <Link to="/profile" className={activeClass("/profile")} onClick={() => setMobileOpen(false)}>Mi Perfil</Link>
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="w-full text-left text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-xl"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
