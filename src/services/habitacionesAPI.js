// URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * Obtiene el token de autenticación desde localStorage
 */
const obtenerToken = () => {
  // Buscar token en adminAuth
  const adminAuth = localStorage.getItem("adminAuth");
  if (adminAuth) {
    try {
      const admin = JSON.parse(adminAuth);
      if (admin.token) {
        return admin.token;
      }
    } catch (error) {
      console.error("Error al parsear adminAuth:", error);
    }
  }
  
  // Buscar token en userAuth como alternativa
  const userAuth = localStorage.getItem("userAuth");
  if (userAuth) {
    try {
      const user = JSON.parse(userAuth);
      if (user.token) {
        return user.token;
      }
    } catch (error) {
      console.error("Error al parsear userAuth:", error);
    }
  }
  
  return null;
};

/**
 * Realiza una petición fetch con manejo de errores
 */
const realizarPeticion = async (url, opciones = {}) => {
  const token = obtenerToken();
  const headers = {
    "Content-Type": "application/json",
    ...opciones.headers,
  };

  // Agregar token si existe
  if (token) {
    headers["x-token"] = token;
  }

  const config = {
    ...opciones,
    headers,
  };

  try {
    const respuesta = await fetch(`${API_BASE_URL}${url}`, config);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      // Si hay errores de validación del backend
      if (respuesta.status === 400 && Array.isArray(datos)) {
        throw new Error(datos.map((err) => err.msg || err.message).join(", "));
      }
      // Otros errores
      throw new Error(datos.mensaje || datos.message || "Error en la petición");
    }

    return datos;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};

/**
 * Obtiene todas las habitaciones
 */
export const obtenerHabitaciones = async () => {
  return realizarPeticion("/habitaciones", {
    method: "GET",
  });
};

/**
 * Obtiene una habitación por ID
 */
export const obtenerHabitacionPorId = async (id) => {
  return realizarPeticion(`/habitaciones/${id}`, {
    method: "GET",
  });
};

/**
 * Crea una nueva habitación
 */
export const crearHabitacion = async (datosHabitacion) => {
  return realizarPeticion("/habitaciones", {
    method: "POST",
    body: JSON.stringify(datosHabitacion),
  });
};

/**
 * Edita una habitación existente
 */
export const editarHabitacion = async (id, datosHabitacion) => {
  return realizarPeticion(`/habitaciones/${id}`, {
    method: "PUT",
    body: JSON.stringify(datosHabitacion),
  });
};

/**
 * Actualiza una habitación existente (alias de editarHabitacion)
 */
export const actualizarHabitacion = async (id, datosHabitacion) => {
  return editarHabitacion(id, datosHabitacion);
};

/**
 * Elimina una habitación
 */
export const eliminarHabitacion = async (id) => {
  return realizarPeticion(`/habitaciones/${id}`, {
    method: "DELETE",
  });
};
