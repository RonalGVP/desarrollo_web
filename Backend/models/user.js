import dbPromise from '../config/database.js';
import bcrypt from 'bcryptjs';

const createUserTable = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
};

// Crear un usuario
const createUser = async (name, email, password) => {
  const db = await dbPromise;
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
};

// Obtener usuario por email
const getUserByEmail = async (email) => {
  const db = await dbPromise;
  return db.get('SELECT * FROM users WHERE email = ?', [email]);
};

export { createUserTable, createUser, getUserByEmail };
