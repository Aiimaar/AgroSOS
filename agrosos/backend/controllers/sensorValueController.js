import models from '../models/index.js';

const { Sensor, SensorValue } = models;

// Obtener todos los valores de sensores
export const getSensorValues = async (req, res) => {
  try {
    const sensorValues = await SensorValue.findAll();
    res.json(sensorValues);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener valores de sensores' });
  }
};

// Obtener un valor específico de sensor por ID
export const getSensorValueById = async (req, res) => {
  const { id } = req.params;
  try {
    const sensorValue = await SensorValue.findByPk(id);
    if (!sensorValue) {
      return res.status(404).json({ error: 'Valor de sensor no encontrado' });
    }
    res.json(sensorValue);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el valor de sensor' });
  }
};