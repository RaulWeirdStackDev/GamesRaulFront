import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext"; // Comentado temporalmente

export const Profile = () => {
  const { userId } = useParams();
  // const { user } = useAuth(); // Comentado temporalmente
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Debug: Mostrar valores en consola
  console.log("userId desde params:", userId);
  // console.log("user actual:", user); // Comentado temporalmente

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

  const handleUpdate = async () => {
    console.log("Iniciando actualización...");
    console.log("Datos a enviar:", { bio, photo });
    
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
      
      // Salir del modo edición después de 2 segundos
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


      {/* Mensajes */}
      {message && (
        <div className={`w-full p-3 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Foto */}
      <img
        src={photo || "/default-avatar.png"}
        alt="Perfil"
        className="w-32 h-32 rounded-full object-cover"
        onError={(e) => {
          e.target.src = "/default-avatar.png";
        }}
      />
      
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder="URL de la foto"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Bio */}
          <textarea
            placeholder="Escribe tu bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border p-2 rounded w-full"
            rows="4"
          />

          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              disabled={updating}
              className={`px-6 py-2 rounded text-white font-medium ${
                updating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {updating ? "Guardando..." : "Guardar"}
            </button>
            
            <button
              onClick={() => {
                setIsEditing(false);
                // Resetear valores originales
                setBio(profile.bio || "");
                setPhoto(profile.photo || "");
                setMessage("");
              }}
              className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Vista de solo lectura */}
          <div className="w-full max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
            <p className="text-gray-600 mb-4">{bio || "Sin biografía"}</p>
            
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Editar Perfil
            </button>
          </div>
        </>
      )}

      {/* Juegos favoritos */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">Juegos Favoritos</h2>
        {profile.favorites && profile.favorites.length > 0 ? (
          <div className="grid gap-3">
            {profile.favorites.map((game) => (
              <div
                key={game.id}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-gray-800">{game.title}</span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                  onClick={() => handleRemoveFavorite(game.id)}
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