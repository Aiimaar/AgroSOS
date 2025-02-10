// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE,  // Usa variables de entorno
//     process.env.MYSQL_USER,     // Usa variables de entorno
//     process.env.MYSQL_PASSWORD,  // Usa variables de entorno
//     {
//         host: 'db',       // Usa el nombre del servicio Docker Compose
//         dialect: 'mysql',
//         logging: false,
//     }
// );

// sequelize.authenticate()
//     .then(() => console.log('Conexión exitosa a MySQL con Sequelize'))
//     .catch(error => console.error('Error de conexión:', error));

// export default sequelize;

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('agrosos', 'root', 'VICJB7m5', {

  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// const sequelize = new Sequelize(
//     process.env.MYSQL_DATABASE,  // Usa variables de entorno
//     process.env.MYSQL_USER,     // Usa variables de entorno
//     process.env.MYSQL_PASSWORD,  // Usa variables de entorno
//     {
//         host: 'db',       // Usa el nombre del servicio Docker Compose
//         dialect: 'mysql',
//         logging: false,
//     }
// );


sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a MySQL con Sequelize'))
  .catch(error => console.error('Error de conexión:', error));

export default sequelize;