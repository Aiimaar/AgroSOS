import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Sensor = sequelize.define('Sensor', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  plot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false,
});

export default Sensor;