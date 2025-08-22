import { useState } from "react";
import { useGames } from "./hooks/useGames";
import { useFavorites } from "./hooks/useFavorites";
import { GameSelector } from "./components/GameSelector";
import { GameFrame } from "./components/GameFrame";
import { GameInfo } from "./components/GameInfo";
import { LoadingState } from "./components/LoadingState";

export const Games = () => {
  const { games, loading } = useGames();
  const { favorites, favoriteLoading, toggleFavorite } = useFavorites();
  const [selected, setSelected] = useState(0);

  if (loading) {
    return <LoadingState message="Cargando juegos..." />;
  }

  if (!games.length) {
    return <LoadingState message="No hay juegos disponibles." />;
  }

  const selectedGame = games[selected];

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6 gap-6 min-h-screen">
      <GameSelector 
        games={games}
        selectedIndex={selected}
        onSelect={setSelected}
        favorites={favorites}
        favoriteLoading={favoriteLoading}
        onToggleFavorite={toggleFavorite}
      />

      <GameFrame game={selectedGame} />

      <GameInfo
        game={selectedGame}
        isFavorite={favorites.includes(selectedGame.id)}
        isLoading={favoriteLoading[selectedGame.id]}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};