import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("Sube tu foto de perfil aquí");

  console.log("userId desde params:", userId);
  console.log("user actual:", user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for userId:", userId);
        const res = await fetch(`http://localhost:3007/api/profile/${userId}`);
        console.log("Response status:", res.status);

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Profile data received:", data);

        // Obtener detalles de los juegos favoritos con logos si no están incluidos
        const favoriteIds = data.favorites?.map(fav => fav.id) || [];
        if (favoriteIds.length > 0 && !data.favorites[0].logo) {
          const gamesRes = await fetch("http://localhost:3007/api/games");
          const gamesData = await gamesRes.json();
          const favoritesWithLogo = data.favorites.map(fav => {
            const gameDetail = gamesData.find(g => g.id === fav.id);
            return { ...fav, logo: gameDetail?.logo };
          });
          data.favorites = favoritesWithLogo;
        }

        setProfile(data);
        setBio(data.bio || "");
        setPhoto(data.photo || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage(`Error al cargar perfil: ${err.message}`);
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const compressImage = (file, maxWidth, maxHeight, quality) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = (err) => reject(err);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const base64 = canvas.toDataURL("image/jpeg", quality);
        if (!base64.startsWith("data:image/jpeg;base64,")) {
          reject(new Error("Error al generar la imagen comprimida"));
        }
        resolve(base64);
      };
      img.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage("❌ La imagen es demasiado grande (máximo 5MB)");
        setSelectedFileName("Sube tu foto de perfil aquí");
        return;
      }
      try {
        setSelectedFileName(file.name);
        const compressedBase64 = await compressImage(file, 300, 300, 0.7);
        setPhoto(compressedBase64);
      } catch (err) {
        console.error("Error al comprimir la imagen:", err);
        setMessage("❌ Error al procesar la imagen");
        setSelectedFileName("Sube tu foto de perfil aquí");
      }
    }
  };

  const handleUpdate = async () => {
    console.log("Iniciando actualización...");
    console.log("Datos a enviar:", { bio, photo: photo ? `${photo.slice(0, 30)}...` : "vacío" });

    if (photo && !photo.startsWith("data:image/")) {
      setMessage("❌ La imagen no es válida");
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:3007/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, photo }),
      });

      console.log("Update response status:", res.status);
      console.log("Update response headers:", res.headers);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const updated = await res.json();
      console.log("Profile updated successfully:", updated);

      setProfile(updated);
      setMessage("✅ Perfil actualizado correctamente");

      setTimeout(() => {
        setIsEditing(false);
        setMessage("");
      }, 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveFavorite = async (gameId) => {
    try {
      const res = await fetch(
        `http://localhost:3007/api/profile/${userId}/favorites/${gameId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Error al eliminar juego favorito");

      setProfile((prev) => ({
        ...prev,
        favorites: prev.favorites.filter((g) => g.id !== gameId),
      }));
      setMessage("✅ Juego eliminado de favoritos");
    } catch (err) {
      console.error("Error removing favorite:", err);
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-white text-lg">Cargando perfil...</p>
      </div>
    </div>
  );
  
  if (!profile) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
      <div className="text-center text-red-600 text-xl">
        <div className="text-6xl mb-4">⚠️</div>
        No se encontró el perfil
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Message Notification */}
        {message && (
          <div className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
            message.includes("✅") 
              ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white" 
              : "bg-gradient-to-r from-red-600 to-red-800 text-white"
          }`}>
            <div className="flex items-center gap-2">
              <div className="text-xl">{message.includes("✅") ? "✅" : "❌"}</div>
              <p className="font-medium">{message.replace(/[✅❌]/g, '').trim()}</p>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-gray-700/20 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/10 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-gray-700 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={photo || "/default-avatar.png"}
                  alt="Perfil"
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-gray-600/20 shadow-2xl"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>

              {/* Profile Info */}
              <div className="text-center lg:text-left flex-1">
                {user?.username && (
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                    ¡Hola, {user.username}!
                  </h1>
                )}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl">
                  {bio || "Sin biografía disponible. ¡Edita tu perfil para contarnos sobre ti!"}
                </p>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="group relative px-8 py-3 bg-gradient-to-r from-blue-700 to-gray-700 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-600/25 transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar Perfil
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white/10 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-8 mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6 text-center">
              Editar Perfil
            </h3>
            
            {/* Photo Upload */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">Foto de perfil</label>
              <div className="relative">
                <label
                  htmlFor="photo-upload"
                  className="group flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-blue-700 to-gray-700 text-white rounded-xl hover:from-blue-800 hover:to-gray-800 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-blue-600/25 transform hover:scale-[1.02]"
                >
                  <svg
                    className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="font-medium">{selectedFileName}</span>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <label className="block text-white text-sm font-medium mb-3">Biografía</label>
              <textarea
                placeholder="Cuéntanos sobre ti..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-4 bg-gray-800/50 border border-gray-600/20 rounded-xl text-gray-300 placeholder-gray-300/60 focus:outline-none focus:ring-2 focus:ring-blue-600/50 backdrop-blur-sm resize-none transition-all duration-300"
                rows="4"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleUpdate}
                disabled={updating}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                  updating 
                    ? "bg-gray-600/50 cursor-not-allowed text-gray-300" 
                    : "bg-gradient-to-r from-blue-700 to-gray-700 hover:from-blue-800 hover:to-gray-800 text-white transform hover:scale-105 hover:shadow-blue-600/25"
                }`}
              >
                {updating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300/30 border-t-white rounded-full animate-spin"></div>
                    Guardando...
                  </span>
                ) : (
                  "Guardar Cambios"
                )}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setBio(profile.bio || "");
                  setPhoto(profile.photo || "");
                  setSelectedFileName("Sube tu foto de perfil aquí");
                  setMessage("");
                }}
                className="px-8 py-3 rounded-xl bg-gray-800/50 border border-gray-600/20 text-white hover:bg-gray-700/50 font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-600/25 transform hover:scale-105"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Favorite Games */}
        <div className="bg-white/10 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            🎮 Juegos Favoritos
          </h2>
          
          {profile.favorites && profile.favorites.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {profile.favorites.map((game) => (
                <div
                  key={game.id}
                  className="group bg-white/10 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-blue-600/25 w-64 flex-shrink-0"
                >
                  <div className="text-center">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-gray-700/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        src={game.logo}
                        alt={`${game.title} logo`}
                        className="relative w-20 h-20 object-contain mx-auto rounded-xl shadow-lg"
                        onError={(e) => {
                          e.target.src = "/default-logo.png";
                        }}
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-4 text-sm leading-tight">{game.title}</h3>
                    <button
                      onClick={() => handleRemoveFavorite(game.id)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-medium rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-600/25"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6 opacity-50">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-3">No tienes juegos favoritos</h3>
              <p className="text-gray-300 text-lg mb-6">
                Descubre nuevos juegos y marca tus favoritos
              </p>
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600/50 to-blue-800/50 border border-gray-600/20 rounded-full text-blue-400 text-sm">
                Ve a la sección de juegos para empezar
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};