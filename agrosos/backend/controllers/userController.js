import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'role', 'email'] });
      res.json(users);
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
  
      // Si hay una nueva imagen cargada
      const profile_image = req.file ? req.file.filename : null;
  
      // Actualizar la información del usuario en la base de datos
      const updatedUser = await User.update(
        { 
          name, 
          email, 
          profile_image: profile_image  // Actualizar el campo de la imagen
        },
        { 
          where: { id: userId },  // Condición para encontrar al usuario
          returning: true,  // Esto hará que Sequelize devuelva el usuario actualizado
          plain: true  // Devuelve un solo registro
        }
      );
  
      if (!updatedUser[1]) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const user = updatedUser[1];  // El usuario actualizado
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image  // Devolver la imagen actualizada
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
      res.json(user);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res.status(500).json({ error: error.message });
    }
  };
  