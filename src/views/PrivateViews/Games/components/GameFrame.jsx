/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export const GameFrame = ({ game }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="shadow-xl border border-gray-600/20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl w-full max-w-5xl mx-auto">
      
      {/* Alerta SOLO para usuarios móviles */}
      {isMobile && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 p-3 text-amber-200 text-sm text-center md:hidden">
          💡 <strong>Tip:</strong> Para mejor experiencia, usa este juego en un dispositivo de escritorio 💻
        </div>
      )}

      {/* Contenedor con aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '62.5%' }}>
        <iframe
          src={game.src}
          title={game.title}
          frameBorder="0"
          scrolling="no"
          // Permitir interacciones táctiles
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // Mejoras para móvil
          sandbox="allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-popups"
          className="absolute top-0 left-0 w-full h-full"
          style={{ 
            border: "none", 
            display: "block", 
            overflow: "hidden",
            margin: 0,
            padding: 0,
            verticalAlign: "top",
            // Mejorar interacción táctil
            touchAction: "manipulation",
            // Evitar selección de texto accidental
            userSelect: "none",
            // Mejorar rendering en móvil
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        />
        
        {/* Overlay invisible para mejorar eventos táctiles en móvil */}
        {isMobile && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              touchAction: "none",
              zIndex: -1
            }}
          />
        )}
      </div>
      
      {/* Controles adicionales SOLO para móvil */}
      {isMobile && (
        <div className="bg-gray-800/50 p-2 text-center text-xs text-gray-300 md:hidden">
          <div className="flex justify-center space-x-4">
            <span>🎮 Usa ambos pulgares</span>
            <span>🔄 Gira para landscape</span>
            <span>📱 Prueba en desktop</span>
          </div>
        </div>
      )}
    </div>
  );
};