import 'dotenv/config';
import sqlite3 from 'sqlite3';

const DB_NAME = process.env.DATABASE_NAME || 'database.sqlite';

const db = new sqlite3.Database(`./${DB_NAME}`, (err) => {
    if (err) {
        console.error('❌ Error al conectar a SQLite:', err.message);
    } else {
        console.log('✅ Conectado a SQLite');
    }
});

// Crear tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'))
    )`);
});

export default db;
