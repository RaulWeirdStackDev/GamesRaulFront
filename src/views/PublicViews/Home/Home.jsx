import { Slider } from "../../../components/Slider";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // asegurarnos de importar el context

export const Home = () => {
  const { user } = useAuth(); // obtenemos el usuario

  return (
    <div className="w-full">
      {/* Hero / Slider */}
      <Slider />

      {/* Sobre R-Gaming */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">Bienvenido a R-Gaming</h1>
        <p className="text-lg text-gray-600">
          <span className="font-semibold">R-Gaming</span> es una plataforma donde podrás probar versiones tempranas de los
          juegos que estoy desarrollando en Unity, Phaser y otras tecnologías. Aquí podrás probar gratuitamente demos y dar retroalimentación antes de que lleguen a su
          versión final, además de otras sorpresas especiales exclusivas!
        </p>
      </section>

      {/* Últimos juegos */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Últimos demos publicados
          </h2>

          <div className="grid gap-6 md:grid-cols-2 justify-items-center">
            {/* Card 1 - Real Fighters */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition w-full max-w-sm">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <img src="/logoRF.png" alt="Real Fighters" className="h-full object-contain" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Real Fighters</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Un juego de pelea 2D con estilo retro inspirado en los clásicos de los 90.
                </p>
                <Link
                  to={user ? "/games" : "/register"} // si está logueado va directo a juegos
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Jugar demo →
                </Link>
              </div>
            </div>

            {/* Card 2 - Out of Eden */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition w-full max-w-sm">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <img src="/logoOoE.png" alt="Out of Eden" className="h-full object-contain" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Out of Eden</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Un juego con un giro divertido a diferentes historias bíblicas.
                </p>
                <Link
                  to={user ? "/games" : "/register"}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Jugar demo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action solo si NO hay usuario */}
      {!user && (
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Quieres probar los juegos?</h2>
          <p className="text-gray-600 mb-6">
            Regístrate para guardar tus juegos favoritos y ser parte de la comunidad.
          </p>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-indigo-700 transition"
          >
            Crear cuenta
          </Link>
        </section>
      )}
    </div>
  );
};
