import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";

export const useFavorites = () => {
   
  const {  token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favoriteLoading, setFavoriteLoading] = useState({});

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3007/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();
        const favoriteIds = data.favorites?.map(fav => fav.id) || [];
        setFavorites(favoriteIds);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  const toggleFavorite = async (gameId) => {
    if (!token) {
      alert("Debes iniciar sesión para agregar favoritos");
      return;
    }

    setFavoriteLoading(prev => ({ ...prev, [gameId]: true }));

    try {
      const isFavorite = favorites.includes(gameId);

      if (isFavorite) {
        const res = await fetch(
          `http://localhost:3007/api/profile/me/favorites/${gameId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) setFavorites(prev => prev.filter(id => id !== gameId));
      } else {
        const res = await fetch(
          `http://localhost:3007/api/profile/me/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ gameId }),
          }
        );

        if (res.ok) setFavorites(prev => [...prev, gameId]);
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
