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

  if (loading) return <div className="p-6 text-center">Cargando perfil...</div>;
  if (!profile) return <div className="p-6 text-center text-red-500">No se encontró el perfil</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
      {message && (
        <div
          className={`w-full p-3 rounded ${
            message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center mt-12">
        <img
          src={photo || "/default-avatar.png"}
          alt="Perfil"
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-200"
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />
        {user?.username && (
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Bienvenido, {user.username}!
          </h2>
        )}
        <p className="text-gray-600 mb-4">{bio || "Sin biografía"}</p>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Editar Perfil
          </button>
        )}
      </div>

      {isEditing && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="relative w-full max-w-xs mx-auto mb-4">
            <label
              htmlFor="photo-upload"
              className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {selectedFileName}
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <textarea
            placeholder="Escribe tu bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            rows="4"
          />
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleUpdate}
              disabled={updating}
              className={`px-6 py-2 rounded text-white font-medium ${
                updating ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {updating ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setBio(profile.bio || "");
                setPhoto(profile.photo || "");
                setSelectedFileName("Sube tu foto de perfil aquí");
                setMessage("");
              }}
              className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Juegos Favoritos</h2>
        {profile.favorites && profile.favorites.length > 0 ? (
          <div className="flex justify-center flex-wrap gap-6">
            {profile.favorites.map((game) => (
              <div
                key={game.id}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow w-full max-w-xs"
              >
                <img
                  src={game.logo}
                  alt={`${game.title} logo`}
                  className="w-16 h-16 object-contain mb-2 rounded"
                  onError={(e) => {
                    e.target.src = "/default-logo.png";
                  }}
                />
                <span className="text-sm font-medium text-gray-800 text-center">{game.title}</span>
                <button
                  onClick={() => handleRemoveFavorite(game.id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">🎮</div>
            <p className="text-gray-500 text-lg">No tienes juegos favoritos aún.</p>
            <p className="text-gray-400 text-sm mt-2">
              Ve a la sección de juegos y marca tus favoritos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};