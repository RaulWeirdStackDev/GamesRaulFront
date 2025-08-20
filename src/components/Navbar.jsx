import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const dropdownRef = useRef(null);

  // Traer foto de perfil si hay usuario
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (user?.id) {
        try {
          const res = await fetch(`http://localhost:3007/api/profile/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setProfilePhoto(data.photo || "");
          }
        } catch (err) {
          console.error("Error fetching profile photo:", err);
        }
      }
    };
    fetchProfilePhoto();
  }, [user?.id]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setProfilePhoto("");
    navigate("/login", { replace: true });
  };

  // Función para determinar clase de pestaña activa
  const activeClass = (path) => {
    // Mapear "/" a "/home" para que Inicio funcione
    const currentPath = location.pathname === "/" ? "/home" : location.pathname;
    return currentPath === path
      ? "relative bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 shadow-lg transform scale-105 font-bold px-6 py-2 rounded-xl transition-all duration-300"
      : "relative text-white/90 hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg font-semibold px-6 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm";
  };

  return (
      <nav className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl relative z-50">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 blur-xl"></div>
        
        <div className="relative flex justify-between items-center py-4 px-6 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link to="/" className="relative block">
              <img 
                src="/logo.png" 
                className="h-20 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300" 
                alt="R-Gaming Logo" 
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex items-center space-x-2 text-lg">
            <Link to="/" className={activeClass("/home")}>
              <span className="relative z-10">Inicio</span>
            </Link>
            
            <Link to="/about" className={activeClass("/about")}>
              <span className="relative z-10">Sobre Mí</span>
            </Link>
            
            <Link to="/contact" className={activeClass("/contact")}>
              <span className="relative z-10">Contacto</span>
            </Link>

            {!user ? (
              <>
                <Link to="/login" className={activeClass("/login")}>
                  <span className="relative z-10">Iniciar Sesión</span>
                </Link>
                <Link 
                  to="/register" 
                  className="relative bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ml-2"
                >
                  <span className="relative z-10">Registrarse</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/games" className={activeClass("/games")}>
                  <span className="relative z-10">Juegos</span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative ml-4" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur opacity-75"></div>
                      <img
                        src={profilePhoto || "/default-avatar.png"}
                        alt="Profile"
                        className="relative w-8 h-8 rounded-full object-cover border-2 border-yellow-400/50"
                        onError={(e) => { e.target.src = "/default-avatar.png"; }}
                      />
                    </div>
                    <span className="font-semibold text-sm">{user.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-60 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-white z-[9999] overflow-hidden">
                      {/* Header del dropdown */}
                      <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 p-4 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur"></div>
                            <img
                              src={profilePhoto || "/default-avatar.png"}
                              alt="Profile"
                              className="relative w-12 h-12 rounded-full object-cover border-2 border-yellow-400/50"
                              onError={(e) => { e.target.src = "/default-avatar.png"; }}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">@{user.username}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-2">
                        <Link
                          to={`/profile/${user.id}`}
                          className="group flex items-center space-x-3 px-4 py-3 text-sm hover:bg-white/10 transition-all duration-200 border-b border-white/5"
                          onClick={() => setProfileOpen(false)}
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-white">Mi Perfil</p>
                            <p className="text-xs text-gray-400">Editar información personal</p>
                          </div>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="group w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-left"
                        >
                          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Cerrar Sesión</p>
                            <p className="text-xs text-gray-500">Salir de tu cuenta</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
  );
};