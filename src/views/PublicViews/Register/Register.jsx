import  { useState } from "react";
import Swal from "sweetalert2";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.nameInput.value.trim();
    const email = e.target.emailInput.value.trim();
    const password = e.target.passwordInput.value;
    const confirmPassword = e.target.confirmPasswordInput.value;

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    // Regex para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Por favor, ingresa un correo electrónico válido.",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Contraseña muy corta",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "La contraseña y la confirmación deben ser iguales.",
      });
      return;
    }

    // Éxito
    Swal.fire({
      icon: "success",
      title: "Registro exitoso 🎉",
      text: `¡Bienvenido, ${name}!`,
    });

    // Aquí podrías enviar los datos al backend
    console.log({
      name,
      email,
      password,
    });

    e.target.reset(); // Limpia el formulario
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Header */}
<header className="bg-gradient-to-r from-[#FFD42A] to-orange-500 shadow-lg w-full max-w-md rounded-t-lg overflow-hidden">
          <div className="flex justify-center py-2">
            <div className="relative inline-block">
              <img
                src="/logo.png"
                className="h-28 drop-shadow-md"
                alt="logo"
              />
            </div>
          </div>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-5 bg-white p-8 shadow-xl px-10 w-full max-w-md rounded-b-lg border border-gray-100"
        >
          <div className="flex flex-col w-full">
            <label
              htmlFor="nameInput"
              className="mb-1 text-center font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nameInput"
              name="nameInput"
              className="border border-gray-300 p-2 rounded-lg text-center w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/30"
              placeholder="💬 Juan Perez"
            />
          </div>

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
              name="emailInput"
              className="border border-gray-300 p-2 rounded-lg text-center w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/30"
              placeholder="📧 correo@correo.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="passwordInput"
              className="mb-1 text-center font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative w-full group">
              <input
                type={showPassword ? "text" : "password"}
                id="passwordInput"
                name="passwordInput"
                className="border border-gray-300 p-2 rounded-lg text-center w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/30"
                placeholder="🔑 ******"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  // Eye-off
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
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 
                        0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 
                        9.97 0 011.563-3.029m5.858.908a3 3 
                        0 114.243 4.243M3 3l3.59 
                        3.59m0 0A9.953 9.953 0 
                        0112 5c4.478 0 8.268 2.943 
                        9.543 7a10.025 10.025 0 
                        01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  // Eye
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
                      strokeWidth="2"
                      d="M15 12a3 3 0 
                        11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 
                        7.943 7.523 5 12 
                        5c4.478 0 8.268 2.943 
                        9.542 7-1.274 4.057-5.064 
                        7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
              className="mb-1 text-center font-medium text-gray-700"
            >
              Confirmar Contraseña
            </label>
            <div className="relative w-full group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPasswordInput"
                name="confirmPasswordInput"
                className="border border-gray-300 p-2 rounded-lg text-center w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/30"
                placeholder="🔑 ******"
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? (
                  // Eye-off
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
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 
                        0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 
                        9.97 0 011.563-3.029m5.858.908a3 3 
                        0 114.243 4.243M3 3l3.59 
                        3.59m0 0A9.953 9.953 0 
                        0112 5c4.478 0 8.268 2.943 
                        9.543 7a10.025 10.025 0 
                        01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  // Eye
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
                      strokeWidth="2"
                      d="M15 12a3 3 0 
                        11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 
                        7.943 7.523 5 12 
                        5c4.478 0 8.268 2.943 
                        9.542 7-1.274 4.057-5.064 
                        7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-px shadow-md hover:shadow-lg text-xl flex items-center justify-center"
          >
            <span>Registrarse</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 
                0l4 4a1 1 0 010 1.414l-4 
                4a1 1 0 01-1.414-1.414L12.586 
                11H5a1 1 0 110-2h7.586l-2.293-2.293a1 
                1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};


