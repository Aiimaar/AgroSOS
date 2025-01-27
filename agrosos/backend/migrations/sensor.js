'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'Sensors'
    await queryInterface.createTable('Sensors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    // Relación: 'Sensors' tiene una clave foránea hacia 'Plots'
    await queryInterface.addConstraint('Sensors', {
      fields: ['plot_id'],
      type: 'foreign key',
      name: 'fk_sensors_plots',
      references: {
        table: 'Plots',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la clave foránea relacionada con 'Sensors'
    await queryInterface.removeConstraint('Sensors', 'fk_sensors_plots');

    // Eliminar la tabla 'Sensors'
    await queryInterface.dropTable('Sensors');
  },
};
