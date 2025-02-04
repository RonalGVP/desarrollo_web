require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const DB_NAME = process.env.DATABASE_NAME || 'database.sqlite';

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(`./${DB_NAME}`, (err) => {
    if (err) {
        console.error('❌ Error al conectar a SQLite:', err.message);
    } else {
        console.log('✅ Conectado a SQLite');
    }
});

// Crear una tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )`);
});

module.exports = db;
