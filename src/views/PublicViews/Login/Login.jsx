import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Error", "Debes ingresar email y contraseña", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3007/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire("Error", data.message || "Algo salió mal", "error");
        return;
      }

      login(data.user, data.token);
      Swal.fire("¡Éxito!", `Bienvenido ${data.user.name}`, "success");
      navigate("/games", { replace: true });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  // Redirigir a la página de recuperación de contraseña
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center w-full max-w-md">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-700 to-gray-700 shadow-lg w-full max-w-md rounded-t-lg overflow-hidden">
            <div className="flex justify-center py-2">
              <img src="/logo.png" className="h-28 drop-shadow-md" alt="logo" />
            </div>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-5 bg-white/10 backdrop-blur-xl p-8 shadow-xl px-10 w-full rounded-b-lg border border-gray-600/20"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Iniciar Sesión
            </h2>

            {/* Email */}
            <div className="flex flex-col w-full">
              <label
                htmlFor="emailInput"
                className="mb-1 font-medium text-white text-center"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-600/20 p-3 rounded-lg w-full bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all duration-200 ease-in-out"
                placeholder="📧 correo@correo.com"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
              <label
                htmlFor="passwordInput"
                className="mb-1 font-medium text-white text-center"
              >
                Contraseña
              </label>
              <div className="relative w-full flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 border border-gray-600/20 rounded-lg px-3 py-3 bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                  placeholder="🔒 ******"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-700 to-gray-700 text-white px-8 py-3 rounded-lg hover:from-blue-800 hover:to-gray-800 active:from-blue-900 active:to-gray-900 transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-px shadow-lg hover:shadow-blue-600/25 text-xl flex items-center justify-center"
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

            {/* Link a registro */}
            <p className="mt-4 text-gray-300 text-center">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-blue-400 font-semibold hover:underline"
              >
                Regístrate
              </Link>
            </p>

            {/* Link a recuperar contraseña */}
            <p
              className="mt-2 text-blue-400 hover:underline cursor-pointer text-center"
              onClick={handleForgotPassword}
            >
              ¿Olvidaste tu contraseña?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};