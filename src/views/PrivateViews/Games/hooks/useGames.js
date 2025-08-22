import { useState, useEffect } from "react";

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3007/api/games");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading };
};