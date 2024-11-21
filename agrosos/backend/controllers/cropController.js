import Crop from '../models/crop.js';

export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.findAll();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cultivos.' });
  }
};

// Crear un nuevo cultivo
export const createCrop = async (req, res) => {
  try {
    const { name, harvest_time, crop_image } = req.body;

    const newCrop = await Crop.create({
      name,
      harvest_time,
      crop_image,
    });

    res.status(201).json(newCrop);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cultivo.' });
  }
};

// Actualizar un cultivo
export const updateCrop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, harvest_time, crop_image } = req.body;

    const crop = await Crop.findByPk(id);
    if (!crop) return res.status(404).json({ error: 'Cultivo no encontrado.' });

    crop.name = name || crop.name;
    crop.harvest_time = harvest_time || crop.harvest_time;
    crop.crop_image = crop_image || crop.crop_image;

    await crop.save();
    res.status(200).json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cultivo.' });
  }
};

// Eliminar un cultivo
export const deleteCrop = async (req, res) => {
  try {
    const { id } = req.params;

    const crop = await Crop.findByPk(id);
    if (!crop) return res.status(404).json({ error: 'Cultivo no encontrado.' });

    await crop.destroy();
    res.status(200).json({ message: 'Cultivo eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cultivo.' });
  }
};
