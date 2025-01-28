import models from "../../models/index.js";

const { Rule, Crop } = models;

const formatRuleInfo = (ruleInfo) => {
  // Si ruleInfo es un objeto, convierte a una cadena JSON legible
  if (typeof ruleInfo === 'object') {
    return JSON.stringify(ruleInfo, null, 2); // Se agrega un formato bonito con indentación
  }
  
  return `Condiciones: ${ruleInfo}`; // Si es un texto simple, lo maneja como antes
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

    // Verificar si rule_info ya es un objeto y no necesita parseo
    let temperatureConditions = [];
    let humidityConditions = [];
    let actuatorType = ''; // Inicializamos el actuador como vacío

    // Verificar si rule_info es una cadena JSON válida
    if (rule.rule_info && typeof rule.rule_info === 'string') {
      try {
        const ruleInfo = JSON.parse(rule.rule_info); // Intentamos parsear solo si es una cadena JSON
        temperatureConditions = ruleInfo.temperatureConditions || [];
        humidityConditions = ruleInfo.humidityConditions || [];
        actuatorType = ruleInfo.actuatorType || ''; // Extraemos actuatorType de rule_info
      } catch (error) {
        console.error('Error al parsear rule_info:', error);
        // Si el parseo falla, podemos asignar valores por defecto o dejar vacío
      }
    }

    res.render('edit-rule.ejs', {
      rule,
      crops,
      cropId: rule.crop_id,
      sensorType: rule.sensorType, // Si ya lo habías configurado
      temperatureConditions, // Pasar las condiciones de temperatura
      humidityConditions, // Pasar las condiciones de humedad
      actuatorType, // Pasar el tipo de actuador
    });
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
  console.log("llegamos a DELETEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
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
