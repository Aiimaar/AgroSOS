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
    const userId = req.user.id;  // Obtener el userId desde req.user, que proviene del token
    const { name, email, language, ...extraFields } = req.body; // Extraer solo los campos permitidos

    // Verificar si se envían campos no permitidos
    if (Object.keys(extraFields).length > 0) {
      return res.status(400).json({
        message: "Solo se permite actualizar 'name', 'email' y 'language'.",
      });
    }

    // Verificar si 'name', 'email' o 'language' existen y no están vacíos
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
    if (language !== undefined && language.trim() === "") {
      return res.status(400).json({
        message: "El campo 'language' no puede estar vacío.",
      });
    }

    // Obtener el usuario existente usando el userId del token
    const existingUser = await User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Actualizar los campos proporcionados: 'name', 'email' y 'language'
    const updatedFields = {};
    if (name !== undefined) updatedFields.name = name;
    if (email !== undefined) updatedFields.email = email;
    if (language !== undefined) updatedFields.language = language;

    // Actualizamos solo los campos permitidos (name, email, language)
    const updatedUser = await existingUser.update(updatedFields);

    // Responder con los datos actualizados
    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      language: updatedUser.language,
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

export const getUserLanguage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      attributes: ['language'],  // Solo devuelve el idioma
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ language: user.language });
  } catch (error) {
    console.error('Error al obtener el idioma del usuario:', error.message);
    res.status(500).json({ message: 'Error al obtener el idioma del usuario.' });
  }
};


export const updateUserLanguage = async (req, res) => {
  const { language } = req.body;  // Obtén el 'language' de los datos del cuerpo

  try {
    const userId = req.params.id;  // Obtén el 'id' del parámetro de la ruta (a diferencia del token en este caso)

    // Verificar si el idioma es válido (puedes agregar más validaciones si lo deseas)
    if (!language) {
      return res.status(400).json({ message: "El idioma es requerido." });
    }

    // Buscar al usuario por ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Actualizar el idioma
    user.language = language;
    await user.save();

    res.status(200).json({ message: "Idioma actualizado correctamente.", user });
  } catch (error) {
    console.error("Error al actualizar el idioma:", error.message);
    res.status(500).json({ message: "Error al actualizar el idioma." });
  }
};
