import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authroutes.js';
import chatbotRoutes from './routes/chatbotroutes.js'; // Importar las rutas del chatbot

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatbotRoutes); // Usar las rutas del chatbot

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
 
  
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});