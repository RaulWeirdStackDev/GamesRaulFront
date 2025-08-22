/* eslint-disable react/prop-types */
export const FavoriteButton = ({ 
  gameId, 
  isFavorite, 
  isLoading, 
  onToggle, 
  size = "small",
  className = "" 
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    large: "w-10 h-10"
  };

  const iconSizes = {
    small: "w-4 h-4",
    large: "w-5 h-5"
  };

  const spinnerSizes = {
    small: "w-4 h-4",
    large: "w-5 h-5"
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(gameId);
      }}
      disabled={isLoading}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${
        isLoading
          ? 'bg-gray-600/50 cursor-not-allowed'
          : isFavorite
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-blue-400 shadow-md border border-gray-600/20'
      } ${className}`}
      title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {isLoading ? (
        <div className={`${spinnerSizes[size]} border-2 border-gray-300/30 border-t-white rounded-full animate-spin`}></div>
      ) : (
        <svg 
          className={iconSizes[size]} 
          fill={isFavorite ? "currentColor" : "none"} 
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
  );
};
