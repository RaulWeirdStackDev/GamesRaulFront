import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/slider1.png",
  "/slider2.png",
  "/slider1.png",
];

export const Slider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto   overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-900/80 via-blue-900/80 to-gray-900/80 bg-white/10 backdrop-blur-xl">
      {/* Slides */}
      <div
        className="flex transition-transform ease-out mt-6 duration-700 mb-6"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full flex-shrink-0 object-cover hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      {/* Botón Izquierda */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gradient-to-br from-blue-700 to-gray-700 p-3 rounded-full text-white hover:from-blue-800 hover:to-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Botón Derecha */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-br from-blue-700 to-gray-700 p-3 rounded-full text-white hover:from-blue-800 hover:to-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full transition-colors ${
              index === current
                ? "bg-gradient-to-br from-blue-500 to-blue-700"
                : "bg-gray-600/50 hover:bg-gray-500/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}