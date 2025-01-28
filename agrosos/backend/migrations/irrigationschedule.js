'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'IrrigationSchedules'
    await queryInterface.createTable('IrrigationSchedules', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      plotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      days: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Relación: 'IrrigationSchedules' tiene una clave foránea hacia 'Plots'
    await queryInterface.addConstraint('IrrigationSchedules', {
      fields: ['plotId'],
      type: 'foreign key',
      name: 'fk_irrigationSchedules_plots',
      references: {
        table: 'Plots',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la clave foránea relacionada con 'IrrigationSchedules'
    await queryInterface.removeConstraint('IrrigationSchedules', 'fk_irrigationSchedules_plots');

    // Eliminar la tabla 'IrrigationSchedules'
    await queryInterface.dropTable('IrrigationSchedules');
  },
};
