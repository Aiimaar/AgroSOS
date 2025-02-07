import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];  // Extrae el token del encabezado
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado o inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decodificar token para obtener el userId
    next();
  } catch (err) {
    console.error("Error al autenticar token:", err);
    res.status(403).json({ message: 'Token no proporcionado o inválido' });
  }
};
