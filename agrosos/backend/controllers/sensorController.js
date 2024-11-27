import models from '../models/index.js';

const { Sensor } = models;

// Obtener todos los sensores
export const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.findAll();
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener sensores' });
  }
};

// Crear un nuevo sensor
export const createSensor = async (req, res) => {
  const { type, plot_id, code } = req.body;
  try {
    const { type, plot_id, code } = req.body;
    const newSensor = await Sensor.create({ type, plot_id, code });
    res.status(201).json(newSensor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el sensor' });
  }
};

// Obtener un sensor específico por ID
export const getSensorById = async (req, res) => {
  const { id } = req.params;
  try {
    const sensor = await Sensor.findByPk(id);
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el sensor' });
  }
};

// Actualizar un sensor
export const updateSensor = async (req, res) => {
  const { id } = req.params;
  const { type, plot_id, code } = req.body;
  try {
    const sensor = await Sensor.findByPk(id);
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }
    sensor.type = type;
    sensor.plot_id = plot_id;
    sensor.code = code;
    await sensor.save();
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el sensor' });
  }
};

// Eliminar un sensor
export const deleteSensor = async (req, res) => {
  const { id } = req.params;
  try {
    const sensor = await Sensor.findByPk(id);
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }
    await sensor.destroy();
    res.json({ message: 'Sensor eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el sensor' });
  }
};
