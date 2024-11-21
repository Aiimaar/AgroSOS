import Plot from '../models/plot.js';
import Sensor from '../models/sensor.js';
import Crop from '../models/crop.js';

export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.findAll();
    res.json(plots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPlot = async (req, res) => {
  const { name, size, temperature, humidity } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !size) {
    return res.status(400).json({ error: 'Nombre y tamaño son obligatorios' });
  }

  try {
    const plot = await Plot.create({ name, size, image, temperature, humidity });
    res.status(201).json(plot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePlot = async (req, res) => {
  const { id } = req.params;
  const { name, size, temperature, humidity } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const updateData = { name, size, temperature, humidity };
    if (image) updateData.image = image;

    await Plot.update(updateData, { where: { id } });
    res.json({ id, name, size, image, temperature, humidity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlot = async (req, res) => {
  const { id } = req.params;
  try {
    await Sensor.destroy({ where: { plot_id: id } });
    await Plot.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
