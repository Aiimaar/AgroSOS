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
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);

  const { name, info, harvest_start_month, harvest_end_month } = req.body;
  
  if (!req.files || !req.files['crop_image'] || !req.files['graphic_image']) {
    return res.status(400).json({ error: 'Imágenes faltantes' });
  }

  const cropImage = req.files['crop_image'][0].filename;
  const graphicImage = req.files['graphic_image'][0].filename;

  try {
    const newCrop = await Crop.create({
      name,
      graphic_image: graphicImage,
      crop_image: cropImage,
      info,
      start_month: harvest_start_month,
      end_month: harvest_end_month,
    });
    res.status(201).json(newCrop);
  } catch (error) {
    console.error('Error al crear el cultivo:', error);
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
  const { name, info, start_month, end_month } = req.body;
  const cropImage = req.files['crop_image']?.[0]?.filename;
  const graphicImage = req.files['graphic_image']?.[0]?.filename;

  try {
    const crop = await Crop.findByPk(id);
    if (!crop) {
      return res.status(404).json({ error: 'Cultivo no encontrado' });
    }
    crop.name = name;
    crop.info = info;
    crop.start_month = start_month;
    crop.end_month = end_month;
    if (cropImage) crop.crop_image = cropImage;
    if (graphicImage) crop.graphic_image = graphicImage;
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
        as: 'crop',
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
