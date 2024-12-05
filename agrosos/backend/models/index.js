import sequelize from '../db.js';

import User from './user.js';
import Sensor from './sensor.js';
import SensorValue from './sensorvalue.js';
import Plot from './plot.js';
import Crop from './crop.js';
import Actuator from './actuator.js';
import Rule from './rule.js'; // Importa el modelo de Rule

// Relaciones entre los modelos

// Plot -> Crop (Un terreno tiene un único cultivo)
Plot.belongsTo(Crop, { foreignKey: 'crop_id', as: 'crop' });
Crop.hasOne(Plot, { foreignKey: 'crop_id' });

// Plot -> Sensor (Un terreno tiene muchos sensores)
Plot.hasMany(Sensor, { foreignKey: 'plot_id' });
Sensor.belongsTo(Plot, { foreignKey: 'plot_id' });

// Sensor -> SensorValue (Un sensor tiene muchos valores)
Sensor.hasMany(SensorValue, { foreignKey: 'sensor_id' });
SensorValue.belongsTo(Sensor, { foreignKey: 'sensor_id' });

// Rule -> User (Una regla pertenece a un técnico)
Rule.belongsTo(User, { foreignKey: 'technician_id', as: 'technician' });
User.hasMany(Rule, { foreignKey: 'technician_id' });

// Rule -> Crop (Una regla pertenece a un cultivo)
Rule.belongsTo(Crop, { foreignKey: 'crop_id', as: 'crop' });
Crop.hasMany(Rule, { foreignKey: 'crop_id' });

// Exporta todos los modelos
const models = {
  sequelize,
  User,
  Sensor,
  SensorValue,
  Plot,
  Crop,
  Actuator,
  Rule,
};

export default models;
