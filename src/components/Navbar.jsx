import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const dropdownRef = useRef(null);

  // Obtener foto del perfil cuando hay usuario logueado
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

  // Cerrar dropdown cuando se hace clic fuera
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
    setProfilePhoto(""); // Limpiar foto al cerrar sesión
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-[#FFD42A] shadow-lg w-full overflow-visible relative">
      <div className="flex justify-between items-center py-2 px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="relative inline-block">
          <img src="/logo.png" className="h-28 drop-shadow-md" alt="logo" />
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6 text-white font-medium text-lg">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/games" className="hover:underline">
                Games
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="hover:underline flex items-center space-x-2 bg-transparent border-none cursor-pointer text-white font-medium text-lg p-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  {/* Foto de perfil */}
                  <img
                    src={profilePhoto || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  <span>{user.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 text-gray-700 z-[9999] overflow-hidden">
                    <div className="py-1">
                      <Link
                        to={`/profile/${user.id}`}
                        className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors border-b border-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span>Mi Perfil</span>
                        </div>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-3 text-sm cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Cerrar sesión</span>
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