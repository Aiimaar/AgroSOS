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
      const { type, plot_id, code } = req.body;
      console.log("Data received from client:", { type, plot_id, code }); // Verificación
  
      if (!type || !plot_id || !code) { // Agrega validación para evitar errores
        return res.status(400).json({ error: 'Type, plot_id, and code are required' });
      }
  
      const newActuator = await Actuator.create({ type, plot_id, code });
      res.status(201).json(newActuator);
    } catch (error) {
      console.error("Error creating actuator:", error.message); // Verificación
      res.status(500).json({ error: 'Error creating actuator', details: error.message });
    }
  },
  

  // Actualizar un actuador
  updateActuator: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, plot_id, code } = req.body;
      const actuator = await Actuator.findByPk(id);
  
      if (!actuator) {
        return res.status(404).json({ error: 'Actuator not found' });
      }
  
      actuator.type = type;
      actuator.plot_id = plot_id;
      actuator.code = code;
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
