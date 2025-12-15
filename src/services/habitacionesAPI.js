const API_URL = 'http://localhost:3001/api/habitaciones';

/**
 * Obtiene todas las habitaciones del backend
 * @returns {Promise<Array>} Lista de habitaciones
 */
export const obtenerHabitaciones = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las habitaciones');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerHabitaciones:', error);
    throw error;
  }
};

/**
 * Obtiene una habitación por su ID
 * @param {string} id - ID de la habitación
 * @returns {Promise<Object>} Datos de la habitación
 */
export const obtenerHabitacionPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener la habitación');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerHabitacionPorId:', error);
    throw error;
  }
};

/**
 * Actualiza una habitación existente
 * @param {string} id - ID de la habitación
 * @param {Object} habitacionData - Datos actualizados de la habitación
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const actualizarHabitacion = async (id, habitacionData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
};

/**
 * Crea una nueva habitación
 * @param {Object} habitacionData - Datos de la habitación
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const crearHabitacion = async (habitacionData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habitacionData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error al crear la habitación');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en crearHabitacion:', error);
    throw error;
  }
};

/**
 * Elimina una habitación por su ID
 * @param {string} id - ID de la habitación a eliminar
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const eliminarHabitacion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error al eliminar la habitación');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en eliminarHabitacion:', error);
    throw error;
  }
};

