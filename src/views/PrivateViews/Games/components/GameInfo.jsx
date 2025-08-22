/* eslint-disable react/prop-types */
import { FavoriteButton } from './FavoriteButton';

export const GameInfo = ({ 
  game, 
  isFavorite, 
  isLoading, 
  onToggleFavorite 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 max-w-4xl w-full text-gray-300 border border-gray-600/20 text-center space-y-4">
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          {game.title}
        </h2>
        <FavoriteButton
          gameId={game.id}
          isFavorite={isFavorite}
          isLoading={isLoading}
          onToggle={onToggleFavorite}
          size="large"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
          Descripción
        </h3>
        <p className="text-gray-300">{game.description}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
          Instrucciones
        </h3>
        <p className="text-gray-300">{game.instructions}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
          Tecnologías
        </h3>
        <p className="text-gray-300 font-medium">{game.technologies}</p>
      </div>
    </div>
  );
};
