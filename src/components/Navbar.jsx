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

  const activeClass = (path) => {
    const currentPath = location.pathname === "/" ? "/home" : location.pathname;
    return currentPath === path
      ? "relative bg-gradient-to-r from-blue-700 to-gray-700 text-white shadow-lg transform scale-105 font-bold px-6 py-2 mx-1 rounded-xl transition-all duration-300"
      : "relative text-gray-300 hover:text-white hover:bg-gray-800/10 hover:scale-105 hover:shadow-lg font-semibold px-6 py-2 mx-1 rounded-xl transition-all duration-300 backdrop-blur-sm";
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-600/20 shadow-2xl relative z-50">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-gray-600/20 blur-xl"></div>
      
      <div className="relative flex items-center justify-between py-3 px-4 max-w-7xl mx-auto">
        {/* Logo - Tamaño original restaurado */}
        <div className="relative group flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-gray-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Link to="/" className="relative block">
            <img 
              src="/logo.png" 
              className="h-20 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300" 
              alt="R-Gaming Logo" 
            />
          </Link>
        </div>

        {/* Slogan - Centro del navbar */}
        <div className="flex-1 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-gray-600/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <p className="relative text-gray-300 font-medium text-lg tracking-wide hover:text-white transition-colors duration-300">
              <span className="bg-gradient-to-r from-blue-50 to-gray-100 bg-clip-text text-transparent">
                Cambiando el mundo un juego a la vez
              </span>
            </p>
          </div>
        </div>

        {/* Menu - Enlaces más anchos y espaciados */}
        <div className="flex items-center text-base flex-shrink-0">
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
              <Link to="/register" className={activeClass("/register")}>
                <span className="relative z-10">Registrarse</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/games" className={activeClass("/games")}>
                <span className="relative z-10">Juegos</span>
              </Link>

              {/* Profile Dropdown - Más compacto y mejor posicionado */}
              <div className="relative ml-3" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-gray-600/20 rounded-xl px-3 py-1.5 text-white hover:bg-gray-800/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-gray-600/30 rounded-full blur opacity-75"></div>
                    <img
                      src={profilePhoto || "/default-avatar.png"}
                      alt="Profile"
                      className="relative w-7 h-7 rounded-full object-cover border-2 border-blue-600/30"
                      onError={(e) => { e.target.src = "/default-avatar.png"; }}
                    />
                  </div>
                  <span className="font-semibold text-sm hidden sm:block">{user.name}</span>
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
                  <div className="absolute right-0 mt-2 w-52 bg-gray-900/95 backdrop-blur-xl border border-gray-600/20 rounded-2xl shadow-2xl text-white z-[9999] overflow-hidden">
                    {/* Header del dropdown - Más compacto */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-gray-600/20 p-3 border-b border-gray-600/20">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-gray-600/30 rounded-full blur"></div>
                          <img
                            src={profilePhoto || "/default-avatar.png"}
                            alt="Profile"
                            className="relative w-10 h-10 rounded-full object-cover border-2 border-blue-600/30"
                            onError={(e) => { e.target.src = "/default-avatar.png"; }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-white truncate">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items - Padding optimizado */}
                    <div className="py-1">
                      <Link
                        to={`/profile/${user.id}`}
                        className="group flex items-center space-x-3 px-3 py-2.5 text-sm hover:bg-gray-800/10 transition-all duration-200 border-b border-gray-600/20"
                        onClick={() => setProfileOpen(false)}
                      >
                        <div className="w-7 h-7 bg-gradient-to-r from-blue-600/20 to-gray-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-gray-600/30 transition-all duration-200 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white">Mi Perfil</p>
                          <p className="text-xs text-gray-400">Editar información</p>
                        </div>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="group w-full flex items-center space-x-3 px-3 py-2.5 text-sm hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-left"
                      >
                        <div className="w-7 h-7 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-all duration-200 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">Cerrar Sesión</p>
                          <p className="text-xs text-gray-400">Salir de tu cuenta</p>
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