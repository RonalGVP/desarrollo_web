import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login } from '../controllers/authcontroller.js';

const router = express.Router();

// Rutas de usuarios
router.get('/users', getUsers);       // Obtener todos los usuarios
router.get('/users/:id', getUserById); // Obtener usuario por ID
router.post('/users', createUser);    // Crear usuario
router.put('/users/:id', updateUser);  // Actualizar usuario
router.delete('/users/:id', deleteUser); // Eliminar usuario

// Rutas de autenticación
router.post('/login', login);         // Login de usuario

export default router;