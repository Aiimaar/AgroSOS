import models from '../../models/index.js';
import bcrypt from 'bcrypt';
import path from 'path';

const { User } = models;

// Ruta pública de imágenes (ajustar según tu configuración)
const imageBaseUrl = 'http://localhost:3000/uploads/';

export const getUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios incluyendo el campo 'profile_image'
    // const users = await User.findAll({
    //   attributes: ['id', 'name', 'role', 'email', 'profile_image'],
    // });

    // // Agregar la URL completa de la imagen
    // const usersWithImageUrls = users.map(user => ({
    //   ...user.toJSON(),
    //   profile_image: user.profile_image ? `${imageBaseUrl}${user.profile_image}` : null,
    // }));

    res.render("header");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, role, email, password, profile_image } = req.body;

  // Validación de campos requeridos
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Email, password and name are required." });
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await User.create({
      name,
      role,
      email,
      password: hashedPassword,
      profile_image: profile_image || null, // Guarda el nombre de la imagen si existe
    });

    // Responder con éxito
    res.status(201).json({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      profile_image: user.profile_image,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
};



// En el controlador userController.js
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, ...extraFields } = req.body; // Extraer solo los campos permitidos

    // Verificar si se envían campos no permitidos
    if (Object.keys(extraFields).length > 0) {
      return res.status(400).json({
        message: "Solo se permite actualizar 'name' y 'email'.",
      });
    }

    // Verificar si 'name' o 'email' existen y no están vacíos
    if (name !== undefined && name.trim() === "") {
      return res.status(400).json({
        message: "El campo 'name' no puede estar vacío.",
      });
    }
    if (email !== undefined && email.trim() === "") {
      return res.status(400).json({
        message: "El campo 'email' no puede estar vacío.",
      });
    }

    // Obtener el usuario existente
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Actualizar solo 'name' y 'email' si se proporcionan y no son vacíos
    const updatedFields = {};
    if (name !== undefined) updatedFields.name = name;
    if (email !== undefined) updatedFields.email = email;

    const updatedUser = await existingUser.update(updatedFields);

    // Responder con los datos actualizados
    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    res.status(500).json({ message: "Error al actualizar el usuario." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    await User.destroy({ where: { id } });

    // Enviar mensaje de confirmación
    res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente.` });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.message);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};


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
