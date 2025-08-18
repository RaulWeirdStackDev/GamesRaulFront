import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"; // Ajusta la ruta según tu estructura

export const Games = () => {
  const { user } = useAuth(); // Obtener usuario actual
  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); // IDs de juegos favoritos
  const [favoriteLoading, setFavoriteLoading] = useState({}); // Loading por juego

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3007/api/games");
        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Cargar favoritos del usuario
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`http://localhost:3007/api/profile/${user.id}`);
        const data = await response.json();
        const favoriteIds = data.favorites?.map(fav => fav.id) || [];
        setFavorites(favoriteIds);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (gameId) => {
    if (!user?.id) {
      alert("Debes iniciar sesión para agregar favoritos");
      return;
    }

    setFavoriteLoading(prev => ({ ...prev, [gameId]: true }));

    try {
      const isFavorite = favorites.includes(gameId);
      
      if (isFavorite) {
        // Eliminar de favoritos
        const response = await fetch(
          `http://localhost:3007/api/profile/${user.id}/favorites/${gameId}`,
          { method: "DELETE" }
        );
        
        if (response.ok) {
          setFavorites(prev => prev.filter(id => id !== gameId));
        }
      } else {
        // Agregar a favoritos
        const response = await fetch(
          `http://localhost:3007/api/profile/${user.id}/favorites`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId })
          }
        );
        
        if (response.ok) {
          setFavorites(prev => [...prev, gameId]);
        }
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
      alert("Error al actualizar favorito");
    } finally {
      setFavoriteLoading(prev => ({ ...prev, [gameId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-medium">
        Cargando juegos...
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-medium">
        No hay juegos disponibles.
      </div>
    );
  }

  const selectedGame = games[selected];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 gap-6 min-h-screen">
      {/* Botones de selección con logos y corazones */}
      <div className="flex gap-6 flex-wrap justify-center">
        {games.map((game, index) => (
          <div key={game.id} className="relative">
            <button
              onClick={() => setSelected(index)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl shadow transition-transform hover:scale-105 ${
                selected === index
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              <img
                src={game.logo}
                alt={`${game.title} logo`}
                className="w-16 h-16 object-contain mb-2"
              />
              <span className="text-sm font-medium">{game.title}</span>
            </button>
            
            {/* Botón de favorito */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(game.id);
              }}
              disabled={favoriteLoading[game.id]}
              className={`absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                favoriteLoading[game.id]
                  ? 'bg-gray-200 cursor-not-allowed'
                  : favorites.includes(game.id)
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-400 hover:text-red-500 shadow-md border'
              }`}
              title={favorites.includes(game.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {favoriteLoading[game.id] ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg 
                  className="w-4 h-4" 
                  fill={favorites.includes(game.id) ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Iframe del juego seleccionado */}
      <div className="shadow-xl border rounded-2xl overflow-hidden bg-white">
        <iframe
          src={selectedGame.src}
          title={selectedGame.title}
          frameBorder="0"
          scrolling="no"
          className="w-[640px] h-[400px] sm:w-[720px] sm:h-[450px] md:w-[800px] md:h-[500px] lg:w-[900px] lg:h-[560px] block"
          style={{ border: "none", display: "block", overflow: "hidden" }}
        ></iframe>
      </div>

      {/* Descripción e instrucciones */}
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-4xl w-full text-gray-800 text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-3xl font-bold">{selectedGame.title}</h2>
          {/* Corazón grande para el juego actual */}
          <button
            onClick={() => toggleFavorite(selectedGame.id)}
            disabled={favoriteLoading[selectedGame.id]}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              favoriteLoading[selectedGame.id]
                ? 'bg-gray-200 cursor-not-allowed'
                : favorites.includes(selectedGame.id)
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-red-500 shadow-md'
            }`}
            title={favorites.includes(selectedGame.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {favoriteLoading[selectedGame.id] ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg 
                className="w-5 h-5" 
                fill={favorites.includes(selectedGame.id) ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            )}
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-1">Description</h3>
          <p className="text-gray-700">{selectedGame.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-1">Instructions</h3>
          <p className="text-gray-700">{selectedGame.instructions}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-1">Technology</h3>
          <p className="text-gray-700 font-medium">{selectedGame.technologies}</p>
        </div>
      </div>
    </div>
  );
};