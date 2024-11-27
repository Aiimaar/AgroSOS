import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Sensor = sequelize.define('Sensor', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false,
});

export default Sensor;