import sequelize from '../db.js';

// Importa todos los modelos
import User from './user.js';
import Sensor from './sensor.js';
import SensorValue from './sensorvalue.js';
import Plot from './plot.js';
import Crop from './crop.js';
import Actuator from './actuator.js';
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

// IrrigationSchedule -> Plot (Una programación de riego pertenece a un único terreno)
IrrigationSchedule.belongsTo(Plot, { foreignKey: 'plotId' });
Plot.hasMany(IrrigationSchedule, { foreignKey: 'plotId' });  // Un terreno puede tener muchas programaciones de riego

// Exportar los modelos junto con la instancia de Sequelize
const models = {
  sequelize,
  User,
  Sensor,
  SensorValue,
  Plot,
  Crop,
  Actuator,
  IrrigationSchedule,  // Asegúrate de incluir IrrigationSchedule en los modelos exportados
};

export default models;
