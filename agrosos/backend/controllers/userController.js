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
  
  export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
      await User.update({ name, email, role }, { where: { id } });
      res.json({ id, name, email, role });
    } catch (error) {
      res.status(500).json({ error: error.message });
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