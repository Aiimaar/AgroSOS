import models from '../../models/index.js'; // Importación de modelos
import bcrypt from 'bcrypt'; // Asegúrate de tener bcrypt para encriptar las contraseñas
const { User } = models;

// Función para obtener la lista de usuarios
export const getUsers = async (req, res) => {
  try {
    console.log("Obteniendo usuarios...");
    const users = await User.findAll({
      attributes: ['id', 'name', 'role', 'email'],
    });

    // console.log("Usuarios obtenidos:", users);

    const usersPerPage = 10;
    const currentPage = parseInt(req.query.page) || 1;
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);

    console.log(`Paginando usuarios: página ${currentPage}, de ${users.length} usuarios totales`);
    
    res.render("userList", {
      users: paginatedUsers,
      currentPage,
      totalPages: Math.ceil(users.length / usersPerPage),
      indexOfLastUser: endIndex,
      totalUsers: users.length,
    });
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    res.status(500).send("Error al obtener los usuarios");
  }
};

export const createUser = async (req, res) => {
  const { name, role, email, password } = req.body;

  console.log("Datos recibidos para crear un usuario:", req.body);

  // Validación de los campos requeridos
  if (!name || !role || !email || !password) {
    console.log("Faltan campos obligatorios");
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    console.log("Encriptando la contraseña...");
    const hashedPassword = await bcrypt.hash(password, 10); // El 10 es el número de rondas de encriptación

    // Crear un nuevo usuario en la base de datos con la contraseña encriptada
    console.log("Creando el usuario...");
    const user = await User.create({ 
      name, 
      role, 
      email, 
      password: hashedPassword // Guardamos la contraseña encriptada
    });

    console.log("Usuario creado exitosamente:", user);

    // Enviar una respuesta exitosa con mensaje y los detalles del nuevo usuario
    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    
    // Responder con error genérico si ocurre algún problema
    res.status(500).json({
      error: error.message || "Error al crear el usuario. Por favor, inténtelo de nuevo más tarde."
    });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;  // Asegúrate de que "userId" coincida con la ruta de la URL

  console.log("Intentando eliminar el usuario con ID:", userId);

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(userId);

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Eliminar al usuario
    console.log("Eliminando el usuario...");
    await user.destroy();

    // Responder con éxito
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export const updateUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { name, email, role, password } = req.body;

  console.log("Datos recibidos para actualizar el usuario:", req.body);
  console.log("ID del usuario a actualizar:", userId);

  if (!userId) {
    return res.status(400).json({ message: 'ID de usuario inválido' });
  }

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    
    if (password) {
      console.log("Actualizando la contraseña...");
      user.password = await hashPassword(password); // Usa una función de hashing segura.
    }

    console.log("Guardando cambios en la base de datos...");
    await user.save();

    console.log("Usuario actualizado correctamente");
    return res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};
