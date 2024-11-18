import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Formato: "Bearer <token>"
  
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

// authorization: Bearer añsldkjfñlasdjfñljasdfñljasñldfkjñlasf