import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'VICJB7m5',
  database: 'agrosos',
});

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión:', error);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

export default connection;