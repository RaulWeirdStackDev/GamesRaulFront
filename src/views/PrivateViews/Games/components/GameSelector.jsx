/* eslint-disable react/prop-types */
import { FavoriteButton } from './FavoriteButton';

export const GameSelector = ({ 
  games, 
  selectedIndex, 
  onSelect, 
  favorites,
  favoriteLoading,
  onToggleFavorite 
}) => {
  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {games.map((game, index) => (
        <div key={game.id} className="relative">
          <button
            onClick={() => onSelect(index)}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl shadow-lg transition-transform hover:scale-105 ${
              selectedIndex === index
                ? "bg-gradient-to-r from-blue-700 to-gray-700 text-white"
                : "bg-gray-800/50 text-gray-300 border border-gray-600/20"
            }`}
          >
            <img
              src={game.logo}
              alt={`${game.title} logo`}
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="text-sm font-medium">{game.title}</span>
          </button>
          
          <FavoriteButton
            gameId={game.id}
            isFavorite={favorites.includes(game.id)}
            isLoading={favoriteLoading[game.id]}
            onToggle={onToggleFavorite}
            className="absolute top-1 left-1"
          />
        </div>
      ))}
    </div>
  );
};