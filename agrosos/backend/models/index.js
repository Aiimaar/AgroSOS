import sequelize from '../db.js';

import User from './user.js';
import Sensor from './sensor.js';
import SensorValue from './sensorvalue.js';
import Plot from './plot.js';
import Crop from './crop.js';
import Actuator from './actuator.js';

// Plot -> Crop (Un terreno tiene un único cultivo)
Plot.belongsTo(Crop, { foreignKey: 'crop_id', as: 'crop' });
Crop.hasOne(Plot, { foreignKey: 'crop_id' });

// Plot -> Sensor (Un terreno tiene muchos sensores)
Plot.hasMany(Sensor, { foreignKey: 'plot_id' });
Sensor.belongsTo(Plot, { foreignKey: 'plot_id' });

// Sensor -> SensorValue (Un sensor tiene muchos valores)
Sensor.hasMany(SensorValue, { foreignKey: 'sensor_id' });
SensorValue.belongsTo(Sensor, { foreignKey: 'sensor_id' });

const models = {
  sequelize,
  User,
  Sensor,
  SensorValue,
  Plot,
  Crop,
  Actuator,
};

export default models;
