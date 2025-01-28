import models from "../../models/index.js";

const { Rule, Crop } = models;

const formatRuleInfo = (ruleInfo) => {
  // Implementa la lógica para formatear la información de la regla
  return `Condiciones: ${ruleInfo}`;
};

export const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.findAll();
    const crops = await Crop.findAll();
    if (rules.length === 0) {
      return res.status(404).json({ message: 'No rules found' });
    }
    res.render('rules.ejs', { rules, crops, formatRuleInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reglas' });
  }
};

export const getRuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await Rule.findByPk(id);

    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }

    const crops = await Crop.findAll();

    res.render('edit-rule.ejs', { rule, crops, formatRuleInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the rule' });
  }
};

export const createRule = async (req, res) => {
  try {
    const { name, crop_id, technician_id, rule_info } = req.body;
    const newRule = await Rule.create({
      name,
      crop_id,
      technician_id,
      rule_info,
    });
    console.log('New Rule created:', newRule); // Aquí puedes usar newRule
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la regla' });
  }
};


export const updateRuleView = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, crop_id, technician_id, rule_info } = req.body;

    const rule = await Rule.findByPk(id);
    if (!rule) {
      return res.status(404).json({ message: 'Regla no encontrada' });
    }

    rule.name = name || rule.name;
    rule.crop_id = crop_id || rule.crop_id;
    rule.technician_id = technician_id || rule.technician_id;
    rule.rule_info = rule_info || rule.rule_info;

    await rule.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la regla' });
  }
};

export const deleteRule = async (req, res) => {
  console.log("llegamos a DELETEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
  try {
    const { id } = req.params;
    const rule = await Rule.findByPk(id);
    if (!rule) {
      return res.status(404).json({ message: 'Regla no encontrada' });
    }

    await rule.destroy();
    res.status(200).json({ message: 'Regla eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la regla' });
  }
};


