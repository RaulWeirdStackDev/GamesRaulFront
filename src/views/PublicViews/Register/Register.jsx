/* eslint-disable no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.nameInput.value.trim();
    const email = e.target.emailInput.value.trim();
    const password = e.target.passwordInput.value;
    const confirmPassword = e.target.confirmPasswordInput.value;

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      Swal.fire(
        "Campos vacíos",
        "Por favor, completa todos los campos.",
        "warning"
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire(
        "Correo inválido",
        "Por favor, ingresa un correo válido.",
        "error"
      );
      return;
    }

    if (password.length < 6) {
      Swal.fire(
        "Contraseña muy corta",
        "Debe tener al menos 6 caracteres.",
        "error"
      );
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire(
        "Contraseñas no coinciden",
        "La contraseña y la confirmación deben ser iguales.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3007/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire("Error", data.message || "Algo salió mal", "error");
        return;
      }

      // Guardar usuario en context
      login(data.user);

      Swal.fire(
        "Registro exitoso 🎉",
        `¡Bienvenido, ${data.user.name}!`,
        "success"
      );

      // Redirigir a /games
      navigate("/games", { replace: true });

      e.target.reset();
    } catch (error) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-700 to-gray-700 shadow-lg w-full max-w-md rounded-t-lg overflow-hidden">
          <div className="flex justify-center py-2">
            <img src="/logo.png" className="h-28 drop-shadow-md" alt="logo" />
          </div>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-5 bg-white/10 backdrop-blur-xl p-8 shadow-xl px-10 w-full max-w-md rounded-b-lg border border-gray-600/20"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Registrarse
          </h2>

          {/* Nombre */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="nameInput"
              className="mb-1 text-center font-medium text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nameInput"
              name="nameInput"
              className="border border-gray-600/20 p-3 rounded-lg text-center w-full bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all duration-200 ease-in-out"
              placeholder="💬 Juan Perez"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="emailInput"
              className="mb-1 text-center font-medium text-white"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="emailInput"
              name="emailInput"
              className="border border-gray-600/20 p-3 rounded-lg text-center w-full bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all duration-200 ease-in-out"
              placeholder="📧 correo@correo.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="passwordInput"
              className="mb-1 text-center font-medium text-white"
            >
              Contraseña
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="passwordInput"
                name="passwordInput"
                className="border border-gray-600/20 p-3 rounded-lg text-center w-full bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all duration-200 ease-in-out"
                placeholder="🔑 ******"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
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

          {/* Confirm Password */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="confirmPasswordInput"
              className="mb-1 text-center font-medium text-white"
            >
              Confirmar Contraseña
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPasswordInput"
                name="confirmPasswordInput"
                className="border border-gray-600/20 p-3 rounded-lg text-center w-full bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all duration-200 ease-in-out"
                placeholder="🔑 ******"
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {showConfirmPassword ? (
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

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-700 to-gray-700 text-white px-8 py-3 rounded-lg hover:from-blue-800 hover:to-gray-800 active:from-blue-900 active:to-gray-900 transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-px shadow-lg hover:shadow-blue-600/25 text-xl flex items-center justify-center"
          >
            <span>Registrarse</span>
          </button>
          <p className="mt-4 text-gray-300 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};