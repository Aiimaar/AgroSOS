import models from "../models/index.js";

const { Rule } = models;

// Obtener todas las reglas
export const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.findAll();
    console.log(rules);
    if (rules.length === 0) {
      return res.status(404).send('No rules found');
    }
    res.render("rules", { rules });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las reglas');
  }
};

// Obtener una regla por ID
export const getRuleById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la regla desde los parámetros de la URL
    const rule = await Rule.findByPk(id); // Buscar la regla por su ID

    if (!rule) {
      return res.status(404).send('Rule not found'); // Si no existe, enviar un 404
    }

    res.render("rule", { rule }); // Si existe, devolver la regla
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving the rule'); // Manejar errores del servidor
  }
};

// Obtener reglas por crop_id
export const getRulesByCrop = async (req, res) => {
  try {
    const { crop_id } = req.query; // Obtener el crop_id desde el query

    if (!crop_id) {
      return res.status(400).send('crop_id is required');  // Si no hay crop_id, devolver un error
    }

    const rules = await Rule.findAll({ where: { crop_id } }); // Buscar reglas por crop_id

    if (rules.length === 0) {
      return res.status(404).send('No rules found for this crop');
    }

    res.render("rules", { rules }); // Devolver las reglas encontradas
  } catch (error) {
    console.error('Error retrieving rules:', error);
    res.status(500).send('Error retrieving rules');
  }
};

// Crear una nueva regla
export const createRule = async (req, res) => {
  try {
    const { name, crop_id, technician_id, rule_info } = req.body;
    const newRule = await Rule.create({
      name,
      crop_id,
      technician_id,
      rule_info,
    });
    res.status(201).render("rule", { rule: newRule });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la regla');
  }
};

// Actualizar una regla
export const updateRule = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, crop_id, technician_id, rule_info } = req.body;
    
    const rule = await Rule.findByPk(id);
    if (!rule) {
      return res.status(404).send('Regla no encontrada');
    }

    rule.name = name || rule.name;
    rule.crop_id = crop_id || rule.crop_id;
    rule.technician_id = technician_id || rule.technician_id;
    rule.rule_info = rule_info || rule.rule_info;

    await rule.save();
    res.render("rule", { rule });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la regla');
  }
};

// Eliminar una regla
export const deleteRule = async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await Rule.findByPk(id);
    if (!rule) {
      return res.status(404).send('Regla no encontrada');
    }

    await rule.destroy();
    res.status(204).send('Regla eliminada exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la regla');
  }
};
