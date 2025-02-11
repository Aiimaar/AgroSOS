import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Asegúrate de que sea la ruta correcta

const Subscription = sequelize.define('Subscription', {
  endpoint: {
    type: DataTypes.STRING,
  },
  expirationTime: {
    type: DataTypes.INTEGER,
  },
  keys: {
    type: DataTypes.STRING,
  },
  subscriptionName: {
    type: DataTypes.STRING,
  }
});

export default Subscription; // Asegúrate de que se exporte correctamente
