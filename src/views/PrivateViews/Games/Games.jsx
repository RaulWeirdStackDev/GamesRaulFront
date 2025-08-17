import { useState } from "react";

export const Games = () => {
  const games = [
    {
      src: "https://out-of-eden.vercel.app/",
      title: "Out of Eden",
      logo: "/logoOoE.png",
      className:
        "w-[640px] h-[400px] sm:w-[720px] sm:h-[450px] md:w-[800px] md:h-[500px] lg:w-[900px] lg:h-[560px] block",
    },
    {
      src: "https://real-fighters-v1-1.vercel.app/",
      title: "Real Fighters",
      logo: "/logoRF.png",
      className:
        "w-[640px] h-[300px] sm:w-[720px] sm:h-[450px] md:w-[800px] md:h-[500px] lg:w-[900px] lg:h-[560px] block",
    },
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 gap-6 min-h-screen">
      {/* Botones de selección con logos */}
      <div className="flex gap-6">
        {games.map((game, index) => (
          <button
            key={index}
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
          src={games[selected].src}
          title={games[selected].title}
          frameBorder="0"
          scrolling="no"
          className={games[selected].className}
          style={{ border: "none", display: "block", overflow: "hidden" }}
        ></iframe>
      </div>
    </div>
  );
};
