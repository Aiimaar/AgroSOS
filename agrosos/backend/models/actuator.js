import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Actuator = sequelize.define('Actuator', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default Actuator;
