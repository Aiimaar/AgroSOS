// controllers/plotController.js
import models from "../models/index.js";

const { Plot } = models;

export const getPlots = async (req, res) => {
  try {
    const plots = await Plot.findAll();
    res.status(200).json(plots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plots" });
  }
};

export const createPlot = async (req, res) => {
  const { name, size, temperature, humidity, color, default_image, user_id } =
    req.body; // Capturamos 'default_image'
  console.log("Color recibido en el controlador:", color); // Agregar esta línea
  console.log("Default image recibido en el controlador:", default_image); // Agregar esta línea
  const image = req.file ? req.file.filename : null;

  if (!name || !size) {
    return res.status(400).json({ error: "Nombre y tamaño son obligatorios" });
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
      farmer_id: user_id,
    });
    res.status(201).json(plot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePlot = async (req, res) => {
  const { id } = req.params;
  const { crop_id, name, size, temperature, humidity, color, default_image } = req.body; // Capturamos 'crop_id'
  const image = req.file ? req.file.filename : undefined;

  console.log("Datos recibidos para actualizar:", { id, crop_id, name, size, temperature, humidity, color, default_image, image });

  try {
    const updateData = { crop_id, name, size, temperature, humidity, color, default_image }; // Incluimos 'crop_id'
    if (image) updateData.image = image;

    const [updated] = await Plot.update(updateData, { where: { id } });
    if (updated) {
      const updatedPlot = await Plot.findByPk(id);
      res.json(updatedPlot);
    } else {
      res.status(404).json({ error: "Plot not found" });
    }
  } catch (error) {
    console.error("Error actualizando el plot:", error);
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

export const getPlotsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const plots = await Plot.findAll({
      where: {
        farmer_id: userId,
      }
    });
    res.status(200).json(plots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching plots' });
  }
};
