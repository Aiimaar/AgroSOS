import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const SensorValue = sequelize.define('SensorValue', {
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sensors', 
      key: 'id',
    },
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'sensor_value', // Aquí especificamos el nombre correcto de la tabla
});

export default SensorValue;
