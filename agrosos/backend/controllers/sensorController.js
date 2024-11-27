import Sensor from '../models/sensor.js';

// Obtener todos los sensores
export const getSensors = async (req, res) => {
  console.log("getSensors")
  try {
    const sensors = await Sensor.findAll();
    res.json(sensors);
  } catch (error) {
    console.error("Error al obtener sensores:", error);
    res.status(500).send("Error al obtener sensores");
  }
};

// Crear un nuevo sensor
export const createSensor = async (req, res) => {
  try {
    const { type, plot_id, code } = req.body;
    const newSensor = await Sensor.create({ type, plot_id, code });
    res.json(newSensor);
  } catch (error) {
    console.error("Error al crear sensor:", error);
    res.status(500).send("Error al crear sensor");
  }
};

// Actualizar un sensor
export const updateSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, plot_id, code } = req.body;
    await Sensor.update({ type, plot_id, code }, { where: { id } });
    res.send("Sensor actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar sensor:", error);
    res.status(500).send("Error al actualizar sensor");
  }
};

// Eliminar un sensor
export const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    await Sensor.destroy({ where: { id } });
    res.send("Sensor eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar sensor:", error);
    res.status(500).send("Error al eliminar sensor");
  }
};
