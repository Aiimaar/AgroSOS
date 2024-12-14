import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Crop = sequelize.define('Crop', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  graphic_image: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  crop_image: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  start_month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default Crop;
