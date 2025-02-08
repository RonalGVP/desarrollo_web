import db from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Obtener todos los usuarios
export const getUsers = (req, res) => {
    db.all('SELECT id, username, email FROM usuarios', (err, rows) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los usuarios' });
        res.json(rows);
    });
};

// Obtener un solo usuario por ID
export const getUserById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT id, username, email FROM usuarios WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
        if (!row) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(row);
    });
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        function (err) {
            if (err) return res.status(500).json({ error: 'Error al crear el usuario' });
            res.status(201).json({ id: this.lastID, username, email });
        }
    );
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Obtener los valores actuales del usuario
    db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Mantener valores originales si no se envían nuevos datos
        const newUsername = username || user.username;
        const newEmail = email || user.email;
        const newPassword = password ? await bcrypt.hash(password, 10) : user.password;

        // Actualizar solo los campos modificados
        db.run(
            `UPDATE usuarios SET username = ?, email = ?, password = ? WHERE id = ?`,
            [newUsername, newEmail, newPassword, id],
            function (err) {
                if (err) return res.status(500).json({ error: 'Error al actualizar el usuario' });
                res.json({ message: 'Usuario actualizado correctamente' });
            }
        );
    });
};

// Eliminar un usuario
export const deleteUser = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: 'Error al eliminar el usuario' });
        if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    });
};

// Función de login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'El email y la contraseña son requeridos' });
    }

    // Buscar usuario por email
    db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Error al verificar el usuario' });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Crear un token JWT
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',  // El token expira en 1 hora
        });

        res.json({ message: 'Login exitoso', token });
    });
};

// Función de logout
export const logout = (req, res) => {
    // Al usar JWT, no necesitamos hacer nada en el backend para el logout,
    // solo eliminamos el token en el frontend.
    res.json({ message: 'Logout exitoso' });
};
