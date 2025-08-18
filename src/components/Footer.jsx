export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Contenido principal del footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Información del creador */}
          <div className="text-center md:text-left">
            <p className="text-lg font-medium">
              Creado por <span className="text-orange-400 font-bold">Raúl Rodríguez Clavero</span>
            </p>
            <p className="text-gray-400 text-sm">Desarrollador Full Stack</p>
          </div>
          
          {/* Links rápidos (opcional) */}
          <div className="flex gap-6 text-sm">
            <a href="/games" className="hover:text-orange-400 transition-colors">
              Games
            </a>
            <a href="/profile" className="hover:text-orange-400 transition-colors">
              Profile
            </a>
          </div>
        </div>
        
        {/* Línea separadora */}
        <div className="border-t border-gray-700 mt-4 pt-4">
          <p className="text-center text-gray-400 text-sm">
            © 2025 R-Gaming. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};