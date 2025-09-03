import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export const Profile = () => {
  const { user, token } = useAuth(); // 👈 ahora traemos también el token del contexto
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("Sube tu foto de perfil aquí");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3007/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();

        // si los favoritos no traen logo, los completamos con la lista de juegos
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
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage(`Error al cargar perfil: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

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
    if (photo && !photo.startsWith("data:image/")) {
      setMessage("❌ La imagen no es válida");
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3007/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio, photo }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const updated = await res.json();

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
        `http://localhost:3007/api/profile/favorites/${gameId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        {/* notificaciones */}
        {message && (
          <div
            className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
              message.includes("✅")
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                : "bg-gradient-to-r from-red-600 to-red-800 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="text-xl">{message.includes("✅") ? "✅" : "❌"}</div>
              <p className="font-medium">{message.replace(/[✅❌]/g, "").trim()}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-gray-700/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/10 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Imagen */}
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

              {/* Info */}
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
                    Editar Perfil
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de edición */}
        {isEditing && (
          <div className="bg-white/10 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-8 mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6 text-center">
              Editar Perfil
            </h3>

            {/* Foto */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">Foto de perfil</label>
              <div className="relative">
                <label
                  htmlFor="photo-upload"
                  className="group flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-blue-700 to-gray-700 text-white rounded-xl hover:from-blue-800 hover:to-gray-800 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-blue-600/25 transform hover:scale-[1.02]"
                >
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
                className="w-full p-4 bg-gray-800/50 border border-gray-600/20 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 resize-none"
                rows="4"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-700 to-gray-700 text-white"
              >
                {updating ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setBio(profile.bio || "");
                  setPhoto(profile.photo || "");
                  setSelectedFileName("Sube tu foto de perfil aquí");
                  setMessage("");
                }}
                className="px-8 py-3 rounded-xl bg-gray-800/50 border border-gray-600/20 text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Favoritos */}
        <div className="bg-white/10 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            🎮 Juegos Favoritos
          </h2>
          {profile.favorites && profile.favorites.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {profile.favorites.map((game) => (
                <div
                  key={game.id}
                  className="group bg-white/10 rounded-2xl p-6 w-64 flex-shrink-0 hover:scale-105 transition-all"
                >
                  <div className="text-center">
                    <img
                      src={game.logo}
                      alt={`${game.title} logo`}
                      className="w-20 h-20 object-contain mx-auto rounded-xl"
                      onError={(e) => {
                        e.target.src = "/default-logo.png";
                      }}
                    />
                    <h3 className="text-white font-semibold mb-4 text-sm">{game.title}</h3>
                    <button
                      onClick={() => handleRemoveFavorite(game.id)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs rounded-full"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-white">No tienes juegos favoritos</div>
          )}
        </div>
      </div>
    </div>
  );
};
