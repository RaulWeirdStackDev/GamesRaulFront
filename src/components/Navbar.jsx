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

  // Clases de pestaña activa con efecto premium
  const activeClass = (path) =>
    location.pathname === path
      ? "text-black bg-gradient-to-r from-orange-400 to-yellow-300 shadow-xl transform scale-105 rounded-lg font-semibold transition-all duration-300"
      : "text-black hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:scale-110 hover:shadow-lg rounded-lg transition-all duration-300";

  return (
<nav className="bg-gradient-to-r from-orange-500 to-[#FFD42A]/90 backdrop-blur-sm shadow-2xl w-full relative">
  <div className="flex justify-between items-center py-1 px-6 max-w-7xl mx-auto">
    {/* Logo */}
    <div className="relative inline-block">
      <img src="/logo.png" className="h-24 drop-shadow-2xl" alt="logo" />
    </div>

    {/* Menú */}
    <div className="flex items-center space-x-8 text-black font-semibold text-xl">
      <Link to="/" className={`px-5 py-2 ${activeClass("/")}`}>Home</Link>
      <Link to="/about" className={`px-5 py-2 ${activeClass("/about")}`}>About</Link>
      <Link to="/contact" className={`px-5 py-2 ${activeClass("/contact")}`}>Contact</Link>

      {!user ? (
        <>
          <Link to="/login" className={`px-5 py-2 ${activeClass("/login")}`}>Login</Link>
          <Link to="/register" className={`px-5 py-2 ${activeClass("/register")}`}>Register</Link>
        </>
      ) : (
        <>
          <Link to="/games" className={`px-5 py-2 ${activeClass("/games")}`}>Games</Link>

          {/* Dropdown Perfil */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 bg-transparent border-none cursor-pointer text-black font-semibold text-xl p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <img
                src={profilePhoto || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                onError={(e) => { e.target.src = "/default-avatar.png"; }}
              />
              <span>{user.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-700 z-[9999] overflow-hidden">
                <div className="py-1">
                  <Link
                    to={`/profile/${user.id}`}
                    className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Mi Perfil</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-3 text-sm cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
