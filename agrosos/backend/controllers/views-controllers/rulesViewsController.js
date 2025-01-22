import Rule from "../../models/rule.js";
import Crop from "../../models/crop.js";

const getAllCrops = async () => {
  try {
    const crops = await Crop.findAll();
    return crops;
  } catch (error) {
    console.error("Error al obtener los cultivos:", error);
    throw error;
  }
};

export const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.findAll();
    const crops = await getAllCrops();
    
    if (rules.length === 0) {
      return res.status(404).render("error", { message: "No rules found" });
    }

    if (crops.length === 0) {
      return res.status(404).render("error", { message: "No crops found" });
    }

    res.render("rules", { rules, crops });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Error al obtener las reglas" });
  }
};

export const getRuleById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Buscando regla con ID: ${id}`); // Logging
    const rule = await Rule.findByPk(id);
    const crops = await getAllCrops();  // Obtener los cultivos para el dropdown

    if (!rule) {
      console.error("Regla no encontrada"); // Logging
      return res.status(404).send("Regla no encontrada");
    }

    const ruleInfo = JSON.parse(rule.rule_info);
    console.log("Información de la regla:", ruleInfo); // Logging
    const sensorType = ruleInfo.AND?.[0]?.sensors?.[0]?.type || null;
    const temperatureConditions = ruleInfo.AND?.[0]?.conditions?.filter(
      (cond) => cond.type === "temperature"
    ) || [];
    const humidityConditions = ruleInfo.AND?.[0]?.conditions?.filter(
      (cond) => cond.type === "humidity"
    ) || [];
    const soilHumidityConditions = ruleInfo.AND?.[0]?.conditions?.filter(
      (cond) => cond.type === "soilHumidity"
    ) || [];
    const soilTemperatureConditions = ruleInfo.AND?.[0]?.conditions?.filter(
      (cond) => cond.type === "soilTemperature"
    ) || [];
    const selectedAction = ruleInfo.AND?.[0]?.actions || [];
    const actuatorType = ruleInfo.AND?.[0]?.actuators?.[0]?.type || null; // Asegúrate de definir actuatorType aquí
    const cropId = rule.crop_id;

    const actuatorActionMap = {
      // Define your actuator-action mappings here
      actuator1: "Action1",
      actuator2: "Action2",
      // Add more mappings as needed
    };

    const availableActions = ["Action1", "Action2"]; // Asegúrate de definir esto también, o ajústalo según sea necesario

    res.render("edit-rule", {
      rule,
      crops,
      cropId,
      sensorType,
      temperatureConditions,
      humidityConditions,
      soilHumidityConditions,
      soilTemperatureConditions,
      selectedAction,
      actuatorType, // Pasar actuatorType a la plantilla
      actuatorActionMap, // Pasar actuatorActionMap a la plantilla
      availableActions // Pasar availableActions a la plantilla
    });
  } catch (error) {
    console.error("Error al recuperar la regla:", error); // Logging
    res.status(500).send("Error al recuperar la regla");
  }
};


export const getRulesByCrop = async (req, res) => {
  try {
    const { crop_id } = req.query;
    if (!crop_id) {
      return res
        .status(400)
        .render("error", { message: "crop_id is required" });
    }
    const rules = await Rule.findAll({ where: { crop_id } });
    const crops = await getAllCrops();
    if (rules.length === 0) {
      return res
        .status(404)
        .render("error", { message: "No rules found for this crop" });
    }
    res.render("rules", { rules, crops });
  } catch (error) {
    console.error("Error retrieving rules:", error);
    res.status(500).render("error", { message: "Error retrieving rules" });
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
    const crops = await getAllCrops();
    res.status(201).render("rule", { rule: newRule, crops });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Error al crear la regla" });
  }
};

// controllers/rulesController.js
export const updateRuleView = async (req, res) => {
  try {
      const { id } = req.params;
      const { crop_id, rule_info } = req.body;
      const rule = await Rule.findByPk(id);
      if (!rule) {
          return res.status(404).render("error", { message: "Regla no encontrada" });
      }
      rule.crop_id = crop_id || rule.crop_id;
      rule.rule_info = rule_info || rule.rule_info;
      await rule.save();
      res.status(200).send('Regla actualizada con éxito');
  } catch (error) {
      console.error("Error al actualizar la regla:", error);
      res.status(500).send('Error al actualizar la regla');
  }
};


export const deleteRule = async (req, res) => {
  console.log(
    `Solicitud DELETE recibida para la regla con ID: ${req.params.id}`
  );
  try {
    const { id } = req.params;
    const rule = await Rule.findByPk(id);
    if (rule) {
      await rule.destroy();
      console.log(`Regla con ID ${id} eliminada exitosamente.`);
      return res.status(200).json({ message: "Regla eliminada correctamente" });
    } else {
      return res.status(404).json({ message: "Regla no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar la regla:", error);
    return res.status(500).json({ message: "Error al eliminar la regla" });
  }
};
