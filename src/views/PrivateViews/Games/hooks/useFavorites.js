import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState({});

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
        const response = await fetch(
          `http://localhost:3007/api/profile/${user.id}/favorites/${gameId}`,
          { method: "DELETE" }
        );
        
        if (response.ok) {
          setFavorites(prev => prev.filter(id => id !== gameId));
        }
      } else {
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

  return { favorites, favoriteLoading, toggleFavorite };
};