import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Base URL correcta para las rutas de autenticación
});

export const register = async (userData) => {
  return await api.post('/users', userData); // POST a /api/auth/users para registrar
};

export const login = async (userData) => {
  return await api.post('/login', userData); // Si tienes una ruta de login
};

export const getUsers = async (token) => {
  try {
    const response = await api.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Retorna solo los datos de la respuesta
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios');
  }
};
// export const getUserById = async (id) => {
//   return await api.get(`/users/${id}`);
// };


// export const updateUser = async (id, userData, token) => {
//   return await api.put(`/users/${id}`, userData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

export const getUserById = async (id) => {
  console.log(`Petición GET a: http://localhost:5000/api/auth/users/${id}`); // Verifica que el ID es correcto
  try {
    const response = await api.get(`/users/${id}`);
    console.log("Respuesta de la API:", response.data);
    return response;
  } catch (error) {
    console.error("Error en la petición GET:", error.response?.data || error.message);
    throw error;
  }
};


export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data; // Devuelve el usuario actualizado
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
}
export const deleteUser = async (id, token) => {
  return await api.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
