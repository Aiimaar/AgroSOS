import Rule from '../models/Rule.js';

// Obtener todas las reglas
export const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.findAll();
    res.status(200).json(rules);
  } catch (error) {
    console.error('Error al obtener las reglas:', error);
    res.status(500).json({ error: 'Error al obtener las reglas' });
  }
};

// Obtener una regla por ID
export const getRuleById = async (req, res) => {
  const { id } = req.params;
  try {
    const rule = await Rule.findByPk(id);
    if (rule) {
      res.status(200).json(rule);
    } else {
      res.status(404).json({ error: 'Regla no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la regla:', error);
    res.status(500).json({ error: 'Error al obtener la regla' });
  }
};

// Crear una nueva regla
export const createRule = async (req, res) => {
  const { name, crop_id, technician_id, rule_info } = req.body;
  try {
    const newRule = await Rule.create({
      name,
      crop_id,
      technician_id,
      rule_info,
    });
    res.status(201).json(newRule);
  } catch (error) {
    console.error('Error al crear la regla:', error);
    res.status(500).json({ error: 'Error al crear la regla' });
  }
};

// Actualizar una regla
export const updateRule = async (req, res) => {
  const { id } = req.params;
  const { name, crop_id, technician_id, rule_info } = req.body;
  try {
    const rule = await Rule.findByPk(id);
    if (rule) {
      await rule.update({
        name,
        crop_id,
        technician_id,
        rule_info,
      });
      res.status(200).json(rule);
    } else {
      res.status(404).json({ error: 'Regla no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la regla:', error);
    res.status(500).json({ error: 'Error al actualizar la regla' });
  }
};

// Eliminar una regla
export const deleteRule = async (req, res) => {
  const { id } = req.params;
  try {
    const rule = await Rule.findByPk(id);
    if (rule) {
      await rule.destroy();
      res.status(200).json({ message: 'Regla eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Regla no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la regla:', error);
    res.status(500).json({ error: 'Error al eliminar la regla' });
  }
};
