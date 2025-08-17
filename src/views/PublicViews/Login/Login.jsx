import { useState, useRef } from "react";
import Swal from "sweetalert2";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!email || !password) {
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

    // Éxito
    Swal.fire({
      icon: "success",
      title: "Login exitoso 🎉",
      text: `¡Bienvenido de nuevo!`,
    });

    // Reset de inputs
    setEmail("");
    setPassword("");

    // Volver a enfocar en email
    if (emailRef.current) {
      emailRef.current.focus();
    }

    console.log("Login submit:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center w-full max-w-md">
          <header className="bg-gradient-to-r from-[#FFD42A] to-orange-500 shadow-lg w-full max-w-md rounded-t-lg overflow-hidden">
            <div className="flex justify-center py-2">
              <img src="/logo.png" className="h-28 drop-shadow-md" alt="logo" />
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-5 bg-white p-8 shadow-xl px-10 w-full rounded-b-lg border border-gray-100"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="emailInput" className="mb-1 font-medium text-gray-700 text-center">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="emailInput"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/30"
                placeholder="📧 correo@correo.com"
              />
            </div>

<div className="flex flex-col w-full">
  <label htmlFor="passwordInput" className="mb-1 font-medium text-gray-700 text-center">
    Contraseña
  </label>
  <div className="relative w-full flex items-center">
    <input
      type={showPassword ? "text" : "password"}
      id="passwordInput"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="🔑 ******"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {showPassword ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  </div>
</div>


            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-px shadow-md hover:shadow-lg text-xl flex items-center justify-center"
            >
              <span>Iniciar Sesión</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
