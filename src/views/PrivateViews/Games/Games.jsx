import { useState, useEffect } from "react";

export const Games = () => {
  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

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
      {/* Botones de selección con logos */}
      <div className="flex gap-6 flex-wrap justify-center">
        {games.map((game, index) => (
          <button
            key={game.id}
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
  <h2 className="text-3xl font-bold mb-4">{selectedGame.title}</h2>

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
