import models from '../models/index.js';

const { Crop, Plot } = models;

// Obtener todos los cultivos
export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.findAll();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cultivos' });
  }
};

// Crear un nuevo cultivo
export const createCrop = async (req, res) => {
  const { name, harvest_time, crop_image } = req.body;
  try {
    const newCrop = await Crop.create({ name, harvest_time, crop_image });
    res.status(201).json(newCrop);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cultivo' });
  }
};

// Obtener un cultivo específico por ID
export const getCropById = async (req, res) => {
  const { id } = req.params;
  try {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      return res.status(404).json({ error: 'Cultivo no encontrado' });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cultivo' });
  }
};

// Actualizar un cultivo
export const updateCrop = async (req, res) => {
  const { id } = req.params;
  const { name, harvest_time, crop_image } = req.body;
  try {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      return res.status(404).json({ error: 'Cultivo no encontrado' });
    }
    crop.name = name;
    crop.harvest_time = harvest_time;
    crop.crop_image = crop_image;
    await crop.save();
    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cultivo' });
  }
};

// Eliminar un cultivo
export const deleteCrop = async (req, res) => {
  const { id } = req.params;
  try {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      return res.status(404).json({ error: 'Cultivo no encontrado' });
    }
    await crop.destroy();
    res.json({ message: 'Cultivo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cultivo' });
  }
};

// Obtener cultivo asociado a un terreno
export const getCropByPlotId = async (req, res) => {
  try {
    const plotId = req.params.plotId;

    const plot = await Plot.findByPk(plotId, {
      include: {
        model: Crop,
        as: 'crop', // Alias definido en la relación
      },
    });

    if (!plot || !plot.crop) {
      return res.status(404).json({ error: 'Cultivo no encontrado para este terreno' });
    }

    res.json(plot.crop);
  } catch (error) {
    console.error('Error al obtener el cultivo:', error);
    res.status(500).json({ error: 'Error al obtener el cultivo', details: error.message });
  }
};



