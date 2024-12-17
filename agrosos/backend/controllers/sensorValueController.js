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

export const createSensorValue = async (req, res) => {
  try {
    const { sensor_id, value, createdAt } = req.body;

    // Verificar que todos los campos están presentes y no están en blanco
    if (!sensor_id || !value || !createdAt) {
      return res.status(400).json({ error: 'Todos los campos (sensor_id, value, createdAt) son obligatorios' });
    }

    if (sensor_id.trim() === '' || value.trim() === '' || createdAt.trim() === '') {
      return res.status(400).json({ error: 'Ninguno de los campos (sensor_id, value, createdAt) puede estar en blanco' });
    }

    const newSensorValue = await SensorValue.create({ sensor_id, value, createdAt });

    res.status(201).json(newSensorValue);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el valor del sensor' });
  }
};


export const deleteSensorValue = async (req, res) => {
  const { id } = req.params; // Obtener el ID desde los parámetros de la URL

  try {
    const deletedRowCount = await SensorValue.destroy({
      where: { id }, // Condición para eliminar el registro
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Valor de sensor no encontrado' });
    }

    res.json({ message: 'Valor de sensor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el valor del sensor' });
  }
};

export const updateSensorValue = async (req, res) => {
  const { id } = req.params; // Obtener el ID desde los parámetros de la URL
  const { value, ...rest } = req.body; // Extraer 'value' y el resto de campos

  try {
    // Comprobación 1: Validar que no se envíen otros campos
    if (Object.keys(rest).length > 0) {
      return res.status(400).json({
        error: 'Solo se permite actualizar el campo "value".'
      });
    }

    // Comprobación 2: Validar que 'value' tenga un valor no vacío
    if (value === undefined || value === null || value === '') {
      return res.status(400).json({
        error: 'El campo "value" no puede estar vacío.'
      });
    }

    // Buscar y actualizar el valor del sensor
    const [updatedRowCount] = await SensorValue.update(
      { value }, // Campo a actualizar
      { where: { id } } // Condición
    );

    if (updatedRowCount === 0) {
      return res.status(404).json({ error: 'Valor de sensor no encontrado.' });
    }

    res.json({ message: 'Valor de sensor actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el valor del sensor.' });
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