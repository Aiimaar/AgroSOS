'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'SensorValues'
    await queryInterface.createTable('SensorValues', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      sensor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sensors',
          key: 'id',
        },
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    });

    // Relación: 'SensorValues' tiene una clave foránea hacia 'Sensors'
    await queryInterface.addConstraint('SensorValues', {
      fields: ['sensor_id'],
      type: 'foreign key',
      name: 'fk_sensor_values_sensors',
      references: {
        table: 'Sensors',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la clave foránea relacionada con 'SensorValues'
    await queryInterface.removeConstraint('SensorValues', 'fk_sensor_values_sensors');

    // Eliminar la tabla 'SensorValues'
    await queryInterface.dropTable('SensorValues');
  },
};
