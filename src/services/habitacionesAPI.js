const API_URL = 'http://localhost:3000/api/habitaciones';

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
export const actualizarHabitacion = async (id, habitacionData) => {
  try {
    // Recuperar token desde sessionStorage (igual que otras consultas que requieren auth)
    const usuarioRaw = sessionStorage.getItem("usuarioKey");
    if (!usuarioRaw) {
      throw new Error("No hay token en la petición");
    }
    const token = JSON.parse(usuarioRaw).token;

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(habitacionData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error al actualizar la habitación');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en actualizarHabitacion:', error);
    throw error;
  }
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
export const eliminarHabitacion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "x-token": JSON.parse(sessionStorage.getItem("usuarioKey")).token,
      },
    });
    
    // Retornamos el objeto response para poder validar el status en el componente
    return response; 
  } catch (error) {
    console.error('Error en eliminarHabitacion:', error);
    return null;
  }
};

/**
 * Elimina una habitación
 */
export const eliminarHabitacion = async (id) => {
  return realizarPeticion(`/habitaciones/${id}`, {
    method: "DELETE",
  });
};
