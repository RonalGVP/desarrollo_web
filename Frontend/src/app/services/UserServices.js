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
  return await api.get('/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getUserById = async (id) => {
  return await api.get(`/users/${id}`);
};


export const updateUser = async (id, userData, token) => {
  return await api.put(`/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = async (id, token) => {
  return await api.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

