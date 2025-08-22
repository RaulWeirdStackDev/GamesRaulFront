/* eslint-disable react/prop-types */
export const GameFrame = ({ game }) => {
  return (
    <div className="shadow-xl border border-gray-600/20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl">
      <iframe
        src={game.src}
        title={game.title}
        frameBorder="0"
        scrolling="no"
        className="w-[640px] h-[400px] sm:w-[720px] sm:h-[450px] md:w-[800px] md:h-[500px] lg:w-[900px] lg:h-[560px] block"
        style={{ border: "none", display: "block", overflow: "hidden" }}
      />
    </div>
  );
};