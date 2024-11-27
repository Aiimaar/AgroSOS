import models from '../models/index.js';

const { Actuator } = models;

const actuatorController = {
  // Obtener todos los actuadores
  getAllActuators: async (req, res) => {
    try {
      const actuators = await Actuator.findAll();
      res.status(200).json(actuators);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching actuators', details: error.message });
    }
  },

  // Crear un actuador
  createActuator: async (req, res) => {
    try {
      const { name, description } = req.body;
      const newActuator = await Actuator.create({ name, description });
      res.status(201).json(newActuator);
    } catch (error) {
      res.status(500).json({ error: 'Error creating actuator', details: error.message });
    }
  },

  // Actualizar un actuador
  updateActuator: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const actuator = await Actuator.findByPk(id);

      if (!actuator) {
        return res.status(404).json({ error: 'Actuator not found' });
      }

      actuator.name = name;
      actuator.description = description;
      await actuator.save();

      res.status(200).json(actuator);
    } catch (error) {
      res.status(500).json({ error: 'Error updating actuator', details: error.message });
    }
  },

  // Eliminar un actuador
  deleteActuator: async (req, res) => {
    try {
      const { id } = req.params;
      const actuator = await Actuator.findByPk(id);

      if (!actuator) {
        return res.status(404).json({ error: 'Actuator not found' });
      }

      await actuator.destroy();
      res.status(200).json({ message: 'Actuator deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting actuator', details: error.message });
    }
  },
};

export default actuatorController;
