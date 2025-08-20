import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);

  // Validar token al cargar el componente
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        Swal.fire("Error", "Token no encontrado", "error");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3007/api/users/validate-reset-token/${token}`,
          { method: "GET" }
        );

        if (res.ok) {
          setTokenValid(true);
        } else {
          const data = await res.json();
          Swal.fire("Error", data.message || "Token inválido o expirado", "error");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error validating token:", err);
        Swal.fire("Error", "No se pudo validar el token", "error");
        navigate("/login");
      }
    };

    validateToken();
  }, [token, navigate]);

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const getPasswordStrength = (pwd) => {
    if (pwd.length === 0) return { strength: 0, text: "", color: "" };
    if (pwd.length < 6) return { strength: 1, text: "Muy débil", color: "text-red-600" };
    if (pwd.length < 8) return { strength: 2, text: "Débil", color: "text-orange-600" };
    if (!validatePassword(pwd)) return { strength: 3, text: "Regular", color: "text-yellow-600" };
    return { strength: 4, text: "Fuerte", color: "text-green-600" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      Swal.fire("Error", "Debes ingresar ambas contraseñas", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3007/api/users/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al actualizar contraseña");
      }

      Swal.fire({
        title: "¡Éxito!",
        text: "Tu contraseña ha sido actualizada correctamente",
        icon: "success",
        confirmButtonText: "Ir al login"
      }).then(() => {
        navigate("/login");
      });

    } catch (err) {
      console.error("Error resetting password:", err);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading mientras valida el token
  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <svg 
            className="animate-spin h-8 w-8 text-blue-600 mb-4" 
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
          <p className="text-gray-600">Validando token...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 7a2 2 0 012 2m0 0a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2zM7 7a2 2 0 012-2 2 2 0 012 2m0 0a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Restablecer Contraseña
          </h2>
          <p className="text-gray-600 text-sm">
            Ingresa tu nueva contraseña segura
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nueva contraseña */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full border border-gray-300 px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Password strength indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength === 1 ? 'bg-red-500 w-1/4' :
                        passwordStrength.strength === 2 ? 'bg-orange-500 w-2/4' :
                        passwordStrength.strength === 3 ? 'bg-yellow-500 w-3/4' :
                        passwordStrength.strength === 4 ? 'bg-green-500 w-full' : ''
                      }`}
                    />
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength.color}`}>
                    {passwordStrength.text}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full border border-gray-300 px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Validación visual de coincidencia */}
            {confirmPassword && (
              <div className="mt-2 flex items-center">
                {password === confirmPassword ? (
                  <div className="flex items-center text-green-600">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Las contraseñas coinciden</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Las contraseñas no coinciden</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Requisitos de contraseña */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-2">Requisitos de contraseña:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
                <span className="mr-2">{password.length >= 8 ? '✓' : '•'}</span>
                Mínimo 8 caracteres
              </li>
              <li className={`flex items-center ${/[A-Za-z]/.test(password) ? 'text-green-600' : ''}`}>
                <span className="mr-2">{/[A-Za-z]/.test(password) ? '✓' : '•'}</span>
                Al menos una letra
              </li>
              <li className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : ''}`}>
                <span className="mr-2">{/\d/.test(password) ? '✓' : '•'}</span>
                Al menos un número
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 hover:shadow-lg"
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
                <span>Actualizando...</span>
              </>
            ) : (
              <>
                <span>Cambiar Contraseña</span>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Recordaste tu contraseña?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
            >
              Volver al login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};