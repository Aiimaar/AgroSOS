import Plot from '../models/plot.js';
import Sensor from '../models/sensor.js';

export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.findAll();
    res.json(plots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPlot = async (req, res) => {
  const { name, size } = req.body;
  try {
    const plot = await Plot.create({ name, size });
    res.status(201).json(plot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlot = async (req, res) => {
  const { id } = req.params;
  const { name, size } = req.body;
  try {
    await Plot.update({ name, size }, { where: { id } });
    res.json({ id, name, size });
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
