import models from "../models/index.js"; // Asegúrate de importar desde el archivo correcto

const { IrrigationSchedule, Plot } = models; // Desestructuramos los modelos

// Crear una nueva programación de riego
export const createIrrigationSchedule = async (req, res) => {
  const { plotId, startDate, endDate, days, time } = req.body;

  console.log('Datos recibidos:', req.body); // Verifica los datos

  // Validación de datos
  if (!plotId || !startDate || !endDate || !days || !time) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el plot existe
    const plot = await Plot.findByPk(plotId);
    if (!plot) {
      return res.status(404).json({ error: "La parcela no existe" });
    }

    // Asegurarse de que `days` es un array
    const daysArray = Array.isArray(days) ? days : JSON.parse(days);

    // Validación para asegurar que `days` sea un array
    if (!Array.isArray(daysArray) || daysArray.length === 0) {
      return res.status(400).json({ error: "El campo 'days' debe ser un array de días válido" });
    }

    // Crear la programación de riego
    const irrigationSchedule = await IrrigationSchedule.create({
      plotId,
      startDate,  // Usamos el formato ISO recibido desde el frontend
      endDate,    // Usamos el formato ISO recibido desde el frontend
      days: JSON.stringify(daysArray), // Convertimos el array a string para almacenarlo en la base de datos
      time,       // Hora en formato 'HH:MM'
    });

    return res.status(201).json(irrigationSchedule);
  } catch (error) {
    console.error("Error al crear programación de riego:", error.message);
    return res.status(500).json({
      error: "Hubo un error al crear la programación de riego.",
      details: error.message,
    });
  }
};

// Obtener todas las programaciones de riego
export const getIrrigationSchedules = async (req, res) => {
  try {
    const irrigationSchedules = await IrrigationSchedule.findAll();
    res.json(irrigationSchedules);
  } catch (error) {
    console.error("Error al obtener programaciones de riego:", error.message);
    res.status(500).json({
      error: "Hubo un error al obtener las programaciones de riego.",
      details: error.message,
    });
  }
};
