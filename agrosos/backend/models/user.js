import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  language: {  // Nuevo campo para el idioma
    type: DataTypes.STRING,
    allowNull: true,  // El idioma puede ser opcional, aunque podrías hacerlo obligatorio
    defaultValue: 'es', // Por defecto, el idioma es español
  },
}, {
  timestamps: false,
});

export default User;
