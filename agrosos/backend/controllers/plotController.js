// controllers/plotController.js
import models from '../models/index.js';

const { Plot } = models;

export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.findAll();
    res.json(plots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPlot = async (req, res) => {
  const { name, size, temperature, humidity, color, default_image } = req.body; // Capturamos 'default_image'
  console.log("Color recibido en el controlador:", color); // Agregar esta línea
  console.log("Default image recibido en el controlador:", default_image); // Agregar esta línea
  const image = req.file ? req.file.filename : null;

  if (!name || !size) {
    return res.status(400).json({ error: 'Nombre y tamaño son obligatorios' });
  }

  try {
    const plot = await Plot.create({
      name,
      size,
      image,
      temperature,
      humidity,
      color,
      default_image, // Agregamos 'default_image' al modelo
    });
    res.status(201).json(plot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePlot = async (req, res) => {
  const { id } = req.params;
  const { name, size, temperature, humidity, color, default_image } = req.body; // Capturamos 'default_image'
  const image = req.file ? req.file.filename : undefined;

  try {
    const updateData = { name, size, temperature, humidity, color, default_image }; // Incluimos 'default_image'
    if (image) updateData.image = image;

    await Plot.update(updateData, { where: { id } });
    res.json({ id, name, size, image, temperature, humidity, color, default_image }); // Devuelve 'default_image' actualizado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlot = async (req, res) => {
  const { id } = req.params;
  try {
    await Plot.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
