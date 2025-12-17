// URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Realiza una petición fetch con manejo de errores
 */
const realizarPeticion = async (url, opciones = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...opciones.headers,
  };

  const config = {
    ...opciones,
    headers,
  };

  try {
    const respuesta = await fetch(`${API_BASE_URL}${url}`, config);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || datos.message || "Error en la petición");
    }

    return datos;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};

/**
 * Inicia sesión de un usuario
 */
export const iniciarSesion = async (email, password) => {
  return realizarPeticion("/usuarios/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Crea un nuevo usuario
 */
export const crearUsuario = async (datosUsuario) => {
  return realizarPeticion("/usuarios", {
    method: "POST",
    body: JSON.stringify(datosUsuario),
  });
};
