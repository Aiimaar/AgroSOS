import models from '../models/index.js';
import bcrypt from 'bcrypt';
import path from 'path';

const { User } = models;

// Ruta pública de imágenes (ajustar según tu configuración)
const imageBaseUrl = 'http://localhost:3000/uploads/';

export const getUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios incluyendo el campo 'profile_image'
    const users = await User.findAll({
      attributes: ['id', 'name', 'role', 'email', 'profile_image'],
    });

    // Agregar la URL completa de la imagen
    const usersWithImageUrls = users.map(user => ({
      ...user.toJSON(),
      profile_image: user.profile_image ? `${imageBaseUrl}${user.profile_image}` : null,
    }));

    res.json(usersWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, role, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, role, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// En el controlador userController.js
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    // Obtener el usuario existente para conservar valores actuales
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si hay una nueva imagen cargada, usa el nuevo valor, de lo contrario conserva el actual
    const profile_image = req.file ? req.file.filename : existingUser.profile_image;

    // Actualizar solo los campos enviados o mantener los valores existentes
    const updatedUser = await existingUser.update({
      name: name || existingUser.name,
      email: email || existingUser.email,
      profile_image: profile_image,
    });

    // Enviar la respuesta con la URL completa de la imagen
    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      profile_image: updatedUser.profile_image ? `${imageBaseUrl}${updatedUser.profile_image}` : null,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET
export const getUserById = async (req, res) => {
  const { id } = req.params;

  console.log("ID recibido:", id);

  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'role', 'email', 'profile_image'],
    });

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado:", user);
    
    // Devolver la URL completa de la imagen
    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      profile_image: user.profile_image ? `${imageBaseUrl}${user.profile_image}` : null,
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: error.message });
  }
};
