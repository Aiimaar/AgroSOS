import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Rule = sequelize.define('Rule', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Crops',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    technician_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'technicians',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    rule_info: {
        type: DataTypes.JSON,
        allowNull: false,
      },
  }, {
    timestamps: false,
    tableName: 'rules',
  });
  
  export default Rule;