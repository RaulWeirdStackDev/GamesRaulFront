// utils/apiClient.js
// ✅ Función helper para hacer peticiones con manejo automático de tokens expirados

export const apiRequest = async (url, options = {}, handleTokenExpiration) => {
  const token = localStorage.getItem("token");
  
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };


    const response = await fetch(url, defaultOptions);
    
    // ✅ Si recibimos 401 o 403, el token expiró
    if (response.status === 401 || response.status === 403) {
      if (handleTokenExpiration) {
        handleTokenExpiration();
      }
      return response; // Devolver la respuesta para que el componente maneje el error
    }

    return response;
 
};