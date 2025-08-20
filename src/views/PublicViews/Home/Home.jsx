import { Slider } from "../../../components/Slider";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero / Slider */}
      <div className="relative">
        <Slider />
        {/* Overlay gradient for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20 pointer-events-none"></div>
      </div>

      {/* Sobre R-Gaming */}
      <section className="relative py-20">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Bienvenido a R-Gaming
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  R-Gaming
                </span> es una plataforma donde podrás probar versiones tempranas de los
                juegos que estoy desarrollando en Unity, Phaser y otras tecnologías. 
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Aquí podrás probar gratuitamente demos y dar retroalimentación antes de que lleguen a su
                versión final, además de otras sorpresas especiales exclusivas!
              </p>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-white font-semibold mb-2">Demos Gratuitas</h3>
                <p className="text-gray-400 text-sm">Prueba todos los juegos completamente gratis</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-white font-semibold mb-2">Feedback Directo</h3>
                <p className="text-gray-400 text-sm">Tu opinión ayuda a mejorar cada juego</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-white font-semibold mb-2">Contenido Exclusivo</h3>
                <p className="text-gray-400 text-sm">Acceso temprano y sorpresas especiales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Últimos juegos */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              🚀 Últimos Demos Publicados
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 justify-items-center max-w-4xl mx-auto">
            {/* Card 1 - Real Fighters */}
            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-500 transform hover:scale-105 w-full max-w-md shadow-2xl hover:shadow-purple-500/25">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              <div className="relative">
                <div className="w-full h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/logoRF.png" 
                    alt="Real Fighters" 
                    className="h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Real Fighters
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Un juego de pelea 2D con estilo retro inspirado en los clásicos de los 90.
                  </p>
                  <Link
                    to={user ? "/games" : "/register"}
                    className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Jugar Demo</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 - Out of Eden */}
            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-500 transform hover:scale-105 w-full max-w-md shadow-2xl hover:shadow-purple-500/25">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              <div className="relative">
                <div className="w-full h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/logoOoE.png" 
                    alt="Out of Eden" 
                    className="h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    Out of Eden
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Un juego con un giro divertido a diferentes historias bíblicas.
                  </p>
                  <Link
                    to={user ? "/games" : "/register"}
                    className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Jugar Demo</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action solo si NO hay usuario */}
      {!user && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
                <div className="text-6xl mb-6">🎯</div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  ¿Listo para la Aventura?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Regístrate para guardar tus juegos favoritos, dar feedback directo y ser parte de nuestra comunidad de early testers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/register"
                    className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      Crear Cuenta Gratis
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white font-semibold text-lg transition-colors duration-300 border-b border-transparent hover:border-purple-400"
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </Link>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">100% Gratuito</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Acceso Inmediato</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Comunidad Activa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Welcome message for logged users */}
      {user && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                ¡Bienvenido de vuelta, {user.username}!
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Explora los juegos disponibles y continúa tu aventura gaming.
              </p>
              <Link
                to="/games"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Explorar Juegos</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};