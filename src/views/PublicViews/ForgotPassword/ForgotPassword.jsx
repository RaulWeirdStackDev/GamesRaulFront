import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Error", "Debes ingresar un correo electrónico", "error");
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire("Error", "Debes ingresar un correo electrónico válido", "error");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Llamar al backend para generar token
      const res = await fetch("http://localhost:3007/api/users/generate-reset-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Error al generar el token");
      }

      // 2️⃣ Si no hay token, el usuario no existe pero mostramos mensaje neutral
      if (!data.token) {
        Swal.fire(
          "Correo enviado",
          "Si el correo existe, recibirás un email con el link para cambiar tu contraseña.",
          "success"
        );
        setEmail("");
        return;
      }

      // 3️⃣ Enviar email vía EmailJS
      const templateParams = {
        to_email: email,
        user_name: data.name || "Usuario",
        reset_link: `${import.meta.env.VITE_FRONTEND_URL || window.location.origin}/reset-password/${data.token}`,
        from_name: "Tu Aplicación",
        reply_to: "noreply@tuapp.com"
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID2,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      Swal.fire({
        title: "¡Correo enviado!",
        text: "Si el correo existe, recibirás un email con el link para cambiar tu contraseña. Revisa también tu bandeja de spam.",
        icon: "success",
        confirmButtonText: "Entendido"
      });

      setEmail("");

    } catch (err) {
      console.error("Error en forgot password:", err);
      
      // Manejo específico de errores de EmailJS
      if (err.text && err.text.includes("EmailJS")) {
        Swal.fire(
          "Error de configuración", 
          "Hay un problema con el servicio de email. Contacta al administrador.", 
          "error"
        );
      } else {
        Swal.fire(
          "Error", 
          err.message || "Ocurrió un error inesperado. Inténtalo de nuevo.", 
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-600/20">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-blue-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
            Recuperar Contraseña
          </h1>
          <p className="text-gray-300 text-sm">
            Ingresa tu correo electrónico y te enviaremos un link para restablecer tu contraseña.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-white mb-2"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full border border-gray-600/20 px-4 py-3 rounded-lg bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all duration-200 disabled:bg-gray-600/20 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
              loading
                ? "bg-gray-600/50 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-700 to-gray-700 hover:from-blue-800 hover:to-gray-800 focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-2 hover:shadow-lg hover:shadow-blue-600/25"
            }`}
          >
            {loading ? (
              <>
                <svg 
                  className="animate-spin h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Enviar link de recuperación</span>
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            ¿Recordaste tu contraseña?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors"
            >
              Volver al login
            </Link>
          </p>
        </div>

        {/* Info adicional */}
        <div className="mt-4 p-3 bg-blue-600/10 rounded-lg">
          <p className="text-xs text-blue-400 text-center">
            💡 El link de recuperación expira en 30 minutos por seguridad
          </p>
        </div>
      </div>
    </div>
  );
};