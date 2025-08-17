import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí llamas al backend para login con email y password
    console.log("Login submit:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center w-full max-w-md">
          <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg w-full rounded-t-lg overflow-hidden">
            <div className="flex justify-center py-2 relative">
              <img
                src="/assets/img/logo_tareas.png"
                className="h-28 drop-shadow-md"
                alt="Logo"
              />
              <p
                className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold"
                style={{
                  textShadow:
                    "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                }}
              >
                NotasApp
              </p>
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center space-y-5 bg-white p-8 shadow-xl px-10 w-full rounded-b-lg border border-gray-100"
          >
            <div className="flex flex-col w-full">
              <label
                htmlFor="emailInput"
                className="mb-1 text-center font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg text-center w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/30"
                placeholder="📧 correo@correo.com"
              />
            </div>

            <div className="flex flex-col w-full relative">
              <label
                htmlFor="passwordInput"
                className="mb-1 text-center font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg text-center w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/30"
                placeholder="🔑 ******"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:scale-110 transition-transform duration-200 ease-in-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 hover:scale-110 transition-transform duration-200 ease-in-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-px shadow-md hover:shadow-lg text-xl flex items-center justify-center"
            >
              <span>Iniciar Sesión</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <footer className="text-center py-4 bg-gray-800 text-white mt-auto text-2xl">
        <p>© 2025 - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
