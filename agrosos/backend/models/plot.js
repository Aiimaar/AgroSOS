import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Plot = sequelize.define('Plot', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
    timestamps: false,
});

export default Plot;