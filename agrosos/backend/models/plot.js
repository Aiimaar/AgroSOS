import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Definir el modelo Plot
const Plot = sequelize.define('Plot', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  crop_id: { // Definimos crop_id como clave foránea
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Crops', // Nombre de la tabla asociada
      key: 'id',
    },
  },
  }, {
  timestamps: false,
});

export default Plot;
