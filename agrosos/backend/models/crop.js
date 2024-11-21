import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Crop = sequelize.define('Crop', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  harvest_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  crop_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false,
});

export default Crop;