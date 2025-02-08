import express from 'express';
import cors from 'cors';
import { createUserTable } from './models/user.js';
import authRoutes from './routes/authroutes.js';

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await createUserTable();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
