import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Registrar un nuevo usuario
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      role,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Iniciar sesión de usuario
export const login = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Encabezado de autorización faltante o inválido" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [email, password] = decodedCredentials.split(":");

  if (!email || !password) {
    return res.status(400).json({ message: "Credenciales faltantes" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user.id });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

