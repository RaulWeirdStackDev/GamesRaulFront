import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Información del creador */}
          <div className="text-center md:text-left">
            <p className="text-lg font-medium">
              Creado por <span className="text-orange-400 font-bold">Raúl Rodríguez Clavero</span>
            </p>
            <p className="text-gray-400 text-sm">Desarrollador Full Stack</p>
          </div>

          {/* Links rápidos */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
            <Link to="/" className="hover:text-orange-400 transition-colors">Inicio</Link>
            <Link to="/about" className="hover:text-orange-400 transition-colors">Sobre Mí</Link>
            <Link to="/contact" className="hover:text-orange-400 transition-colors">Contacto</Link>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm">
            <a
              href="https://wa.me/56972033734"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.372 0 0 5.373 0 12c0 2.118.554 4.092 1.522 5.84L0 24l6.36-1.47A11.923 11.923 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.243-6.208-3.48-8.52zM12 22.12a10.11 10.11 0 01-5.22-1.48l-.374-.222-3.774.873.8-3.674-.242-.386A10.06 10.06 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm5.2-7.8c-.28-.14-1.652-.816-1.908-.91-.256-.094-.442-.14-.628.14s-.72.91-.88 1.096c-.16.186-.32.21-.6.07s-1.208-.444-2.3-1.42c-.852-.76-1.428-1.696-1.596-1.88-.168-.186-.018-.286.126-.426.13-.13.28-.34.42-.51.14-.17.186-.28.28-.466.094-.186.047-.35-.023-.49-.07-.14-.628-1.512-.86-2.072-.226-.548-.456-.474-.628-.484-.16-.008-.35-.01-.54-.01s-.49.07-.748.35c-.256.28-.978.954-.978 2.326 0 1.372 1.002 2.7 1.142 2.886.14.186 1.972 3.02 4.774 4.232.668.288 1.188.46 1.594.588.67.212 1.28.182 1.76.11.538-.08 1.652-.674 1.888-1.324.236-.65.236-1.204.164-1.33-.07-.13-.26-.186-.54-.326z"/>
              </svg>
              +56 9 7203 3734
            </a>

            <a
              href="mailto:raul.rodriguez.c.2012@gmail.com"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.013-8-5.013V6h16zM4 18V8.486l7.777 4.86a.999.999 0 001.446 0L20 8.486V18H4z"/>
              </svg>
              raul.rodriguez.c.2012@gmail.com
            </a>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-center text-gray-400 text-sm">
            © 2025 R-Gaming. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
