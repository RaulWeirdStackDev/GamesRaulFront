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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Contenedor principal con padding responsivo */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Layout principal - columna en móvil, puede ser diferente en desktop */}
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          
          {/* Selector de juegos */}
          <div className="w-full">
            <GameSelector 
              games={games}
              selectedIndex={selected}
              onSelect={setSelected}
              favorites={favorites}
              favoriteLoading={favoriteLoading}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          {/* GameFrame - Centrado */}
          <div className="w-full flex justify-center">
            <GameFrame game={selectedGame} />
          </div>

          {/* GameInfo - Siempre debajo del frame */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-2xl">
              <GameInfo
                game={selectedGame}
                isFavorite={favorites.includes(selectedGame.id)}
                isLoading={favoriteLoading[selectedGame.id]}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};