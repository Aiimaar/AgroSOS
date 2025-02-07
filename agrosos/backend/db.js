import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('agrosos', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a MySQL con Sequelize'))
  .catch(error => console.error('Error de conexión:', error));

export default sequelize;