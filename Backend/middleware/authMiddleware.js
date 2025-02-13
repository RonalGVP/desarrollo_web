const authMiddleware = (req, res, next) => {
    // Obtener el token desde el encabezado Authorization
    const token = req.headers['authorization']?.split(' ')[1];

    console.log('Token recibido:', token); // Para depurar el token

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decodificación:", decoded);
        req.user = decoded; // Guarda la info del usuario en `req.user`
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export default authMiddleware;
