import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/authcontroller.js';

const router = express.Router();

router.get('/users', getUsers);       // Obtener todos los usuarios
router.get('/users/:id', getUserById); // Obtener usuario por ID
router.post('/users', createUser);    // Crear usuario
router.put('/users/:id', updateUser);  // Actualizar usuario
router.delete('/users/:id', deleteUser); // Eliminar usuario

export default router;
