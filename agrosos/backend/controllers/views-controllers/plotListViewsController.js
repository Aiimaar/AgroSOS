import models from "../../models/index.js";

const { Plot, SensorValue } = models;

async function getSensorAverages() {
  // Suponiendo que tienes una tabla SensorData que tiene información de los sensores de cada terreno
  const sensorData = await SensorValue.findAll(); // Obtén los datos de sensores desde la base de datos

  const averages = {};

  // Procesamos los datos para calcular los promedios
  sensorData.forEach(data => {
    const plotId = data.plotId;
    if (!averages[plotId]) {
      averages[plotId] = { temperature: 0, humidity: 0, count: 0 };
    }
    averages[plotId].temperature += data.temperature;
    averages[plotId].humidity += data.humidity;
    averages[plotId].count += 1;
  });

  // Calculamos los promedios y eliminamos el contador
  Object.keys(averages).forEach(plotId => {
    averages[plotId].temperature /= averages[plotId].count;
    averages[plotId].humidity /= averages[plotId].count;
    delete averages[plotId].count; // Eliminar el contador después de calcular el promedio
  });

  return averages; // Retorna los promedios
}

export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.findAll(); // Recupera todos los terrenos
    const sensorAverages = await getSensorAverages(); // Calcula promedios de sensores

    const updatePlot = req.params.id
      ? await Plot.findByPk(req.params.id) // Recupera terreno si se está editando
      : null;

    res.render('plot-list', {
      plots,
      sensorAverages,
      error: null,
      updatePlot,
    });
  } catch (error) {
    console.error('Error fetching plots:', error);
    res.render('plot-list', {
      plots: [],
      sensorAverages: {},
      error: 'Error al cargar los terrenos',
      updatePlot: null,
    });
  }
};

// Crear un nuevo terreno
export const createPlot = async (req, res) => {
  const { name, size, temperature, humidity, color, default_image, user_id } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !size) {
    return res.render("plot-list", {
      plots: await Plot.findAll(),
      updatePlot: null,
      errorMessage: "Nombre y tamaño son obligatorios",
    });
  }

  try {
    await Plot.create({
      name,
      size,
      image,
      temperature,
      humidity,
      color,
      default_image,
      farmer_id: user_id,
    });
    res.redirect("/plot-list");
  } catch (error) {
    console.error("Error creating plot:", error);
    res.render("plot-list", {
      plots: await Plot.findAll(),
      updatePlot: null,
      errorMessage: "Error creating plot",
    });
  }
};

// Actualizar un terreno existente
export const updatePlot = async (req, res) => {
  const { id } = req.params;
  const { crop_id, name, size, temperature, humidity, color, default_image } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const updateData = { crop_id, name, size, temperature, humidity, color, default_image };
    if (image) updateData.image = image;

    const [updated] = await Plot.update(updateData, { where: { id } });
    const plots = await Plot.findAll(); // Obtener todos los terrenos

    if (updated) {
      const updatedPlot = await Plot.findByPk(id); // Obtener el terreno actualizado
      res.render("plot-list", { plots, updatePlot: updatedPlot, error: null });
    } else {
      res.render("plot-list", { plots, updatePlot: null, error: "Plot not found" });
    }
  } catch (error) {
    console.error("Error updating plot:", error);
    const plots = await Plot.findAll();
    res.render("plot-list", { plots, updatePlot: null, error: "Error updating plot" });
  }
};

// Eliminar un terreno
export const deletePlot = async (req, res) => {
  const { id } = req.params;

  try {
    await Plot.destroy({ where: { id } });
    res.redirect("/plot-list");
  } catch (error) {
    console.error("Error deleting plot:", error);
    res.render("plot-list", {
      plots: await Plot.findAll(),
      updatePlot: null,
      errorMessage: "Error deleting plot",
    });
  }
};

// Obtener terrenos de un usuario específico
export const getPlotsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const plots = await Plot.findAll({ where: { farmer_id: userId } });
    res.render("plot-list", { plots, updatePlot: null, error: null });
  } catch (error) {
    console.error("Error fetching plots by user ID:", error);
    res.render("plot-list", { plots: [], updatePlot: null, errorMessage: "Error fetching plots" });
  }
};
