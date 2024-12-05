import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Ajusta el nombre de archivo según tu proyecto

const Plot = sequelize.define(
  'Plot',
  {
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
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^#([0-9A-F]{3}){1,2}$/i,
      },
    },
    crop_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Crops',
        key: 'id',
      },
    },
    default_image: {
      type: DataTypes.STRING,
      allowNull: true, // Permite nulo si no se usa imagen predeterminada
      defaultValue: null, // Valor por defecto si no se especifica
    },
  },
  {
    timestamps: false,
  }
);

export default Plot;
