import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white mt-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-gray-600/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-12">
        {/* Contenido principal */}
        <div className="bg-white/10 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
            
            {/* Info creador */}
            <div className="text-center lg:text-left max-w-sm">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-xl">R</span>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Raúl Rodríguez Clavero
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">Desarrollador Full Stack & Game Developer</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Creando experiencias gaming únicas.
              </p>
            </div>

            {/* Links rápidos */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <h3 className="text-white font-semibold text-base sm:text-lg">Navegación</h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm">
                <Link 
                  to="/" 
                  className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-sm border border-gray-600/20 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-gray-600/20 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Inicio
                </Link>
                <Link 
                  to="/about" 
                  className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-sm border border-gray-600/20 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-gray-600/20 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sobre Mí
                </Link>
                <Link 
                  to="/contact" 
                  className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-sm border border-gray-600/20 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-gray-600/20 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contacto
                </Link>
              </div>
            </div>

            {/* Contacto */}
            <div className="text-center lg:text-right max-w-xs w-full">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3">¡Conecta Conmigo!</h3>
              <div className="flex flex-col gap-3 w-full">
                <a
                  href="https://wa.me/56972033734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center lg:justify-end gap-3 px-4 py-3 bg-blue-600/10 backdrop-blur-sm border border-blue-600/20 rounded-xl hover:bg-blue-600/20 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-all duration-300">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.372 0 0 5.373 0 12c0 2.118.554 4.092 1.522 5.84L0 24l6.36-1.47A11.923 11.923 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.243-6.208-3.48-8.52zM12 22.12a10.11 10.11 0 01-5.22-1.48l-.374-.222-3.774.873.8-3.674-.242-.386A10.06 10.06 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm5.2-7.8c-.28-.14-1.652-.816-1.908-.91-.256-.094-.442-.14-.628.14s-.72.91-.88 1.096c-.16.186-.32.21-.6.07s-1.208-.444-2.3-1.42c-.852-.76-1.428-1.696-1.596-1.88-.168-.186-.018-.286.126-.426.13-.13.28-.34.42-.51.14-.17.186-.28.28-.466.094-.186.047-.35-.023-.49-.07-.14-.628-1.512-.86-2.072-.226-.548-.456-.474-.628-.484-.16-.008-.35-.01-.54-.01s-.49.07-.748.35c-.256.28-.978.954-.978 2.326 0 1.372 1.002 2.7 1.142 2.886.14.186 1.972 3.02 4.774 4.232.668.288 1.188.46 1.594.588.67.212 1.28.182 1.76.11.538-.08 1.652-.674 1.888-1.324.236-.65.236-1.204.164-1.33-.07-.13-.26-.186-.54-.326z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white text-sm">WhatsApp</p>
                    <p className="text-blue-400 text-xs">+56 9 7203 3734</p>
                  </div>
                </a>

                <a
                  href="mailto:raul.rodriguez.c.2012@gmail.com"
                  className="group flex items-center justify-center lg:justify-end gap-3 px-4 py-3 bg-gray-600/10 backdrop-blur-sm border border-gray-600/20 rounded-xl hover:bg-gray-600/20 hover:border-gray-500/40 hover:shadow-lg hover:shadow-gray-600/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-gray-600/20 rounded-lg flex items-center justify-center group-hover:bg-gray-600/30 transition-all duration-300">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.013-8-5.013V6h16zM4 18V8.486l7.777 4.86a.999.999 0 001.446 0L20 8.486V18H4z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white text-sm">Email</p>
                    <p className="text-gray-400 text-xs">raul.rodriguez.c.2012@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tecnologías + copyright */}
        <div className="bg-white/5 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Tecnologías */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
              {["Unity", "React", "Phaser", "Node.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-gray-600/20 border border-blue-500/30 rounded-full text-xs text-blue-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-2">
                <span>© 2025 R-Gaming</span>
                <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full"></div>
                <span className="hidden sm:inline">Hecho con</span>
                <span className="text-blue-400 animate-pulse">❤️</span>
                <span className="hidden sm:inline">en Chile</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
