require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send(`Servidor corriendo en el puerto ${PORT}`);
});

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Agregar un usuario
app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    db.run('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, nombre, email });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
