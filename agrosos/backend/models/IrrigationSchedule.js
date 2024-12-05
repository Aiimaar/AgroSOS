import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const IrrigationSchedule = sequelize.define('IrrigationSchedule', {
  plotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  days: {
    type: DataTypes.JSON, // Correcto para MySQL
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default IrrigationSchedule;
