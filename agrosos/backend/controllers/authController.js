import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';

const { User } = models;

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

    // Generar el token JWT incluyendo el id y el role del usuario
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(user.role)
    // Responder con el token, userId y role
    res.json({ token, userId: user.id, role: user.role });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
