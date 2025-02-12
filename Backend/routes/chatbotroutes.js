import express from 'express';
import { sendMessage } from '../controllers/chatbotController.js'; // Importar sendMessage

const router = express.Router();

// Ruta para enviar un mensaje
router.post('/message', sendMessage);

export default router;