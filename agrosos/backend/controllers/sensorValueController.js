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

export const getSensorValueByPlotId = async (req, res) => {
  const { plotId } = req.params;
  try {
    const sensorValues = await SensorValue.findAll({
      include: [
        {
          model: Sensor,
          where: { plot_id: plotId },
        },
      ],
    });

    if (!sensorValues || sensorValues.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de sensores para este terreno' });
    }

    res.json(sensorValues);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener valores del sensor',
      error: error.message,
    });
  }
};