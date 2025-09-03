import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext"; ;

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth(); // accede al token

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3007/api/games", {
          headers: {
            Authorization: `Bearer ${token}`, // <-- pasa el token
          },
        });
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchGames(); // solo intenta fetch si hay token
  }, [token]); // vuelve a ejecutar si el token cambia

  return { games, loading };
};
