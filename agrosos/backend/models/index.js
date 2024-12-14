import sequelize from '../db.js';

// Importa todos los modelos
import User from './user.js';
import Sensor from './sensor.js';
import SensorValue from './sensorvalue.js';
import Plot from './plot.js';
import Crop from './crop.js';
import Actuator from './actuator.js';
import Rule from './rule.js'; // Importa el modelo de Rule

// Relaciones entre los modelos
import IrrigationSchedule from './IrrigationSchedule.js';  // Asegúrate de importar correctamente IrrigationSchedule

// Configuración de asociaciones
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
// IrrigationSchedule -> Plot (Una programación de riego pertenece a un único terreno)
IrrigationSchedule.belongsTo(Plot, { foreignKey: 'plotId' });
Plot.hasMany(IrrigationSchedule, { foreignKey: 'plotId' });  // Un terreno puede tener muchas programaciones de riego

User.hasMany(Plot, { foreignKey: 'farmer_id', onDelete: 'CASCADE' });
Plot.belongsTo(User, { foreignKey: 'farmer_id' });

// Exportar los modelos junto con la instancia de Sequelize
const models = {
  sequelize,
  User,
  Sensor,
  SensorValue,
  Plot,
  Crop,
  Actuator,
  Rule,
  IrrigationSchedule,  // Asegúrate de incluir IrrigationSchedule en los modelos exportados
};

export default models;
