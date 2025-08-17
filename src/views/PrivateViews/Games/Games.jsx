export const Games = () => {
  const games = [
    {
      src: "https://out-of-eden.vercel.app/",
      title: "Out of Eden Game",
      className: "w-[640px] h-[400px] sm:w-[720px] sm:h-[450px] md:w-[800px] md:h-[500px] lg:w-[900px] lg:h-[560px] block"
    },
    {
        src:"https://real-fighters-v1-1.vercel.app/",
        title:"Real Fighters",
        className:"w-[640px] h-[300px] sm:w-[720px] sm:h-[450px] md:w-[800px] md:h-[500px] lg:w-[900px] lg:h-[560px] block"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 gap-6">
      {games.map((game, index) => (
        <div
          key={index}
          className="shadow-xl border rounded-2xl overflow-hidden bg-white"
        >
          <iframe
            src={game.src}
            title={game.title}
            frameBorder="0"
            scrolling="no"
            className={game.className}
            style={{ border: "none", display: "block", overflow: "hidden" }}
          ></iframe>
        </div>
      ))}
    </div>
  );
};
