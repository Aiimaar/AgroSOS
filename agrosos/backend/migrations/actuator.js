'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'Actuators'
    await queryInterface.createTable('Actuators', {
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

    // Agregar la clave foránea entre 'Actuators' y 'Plots'
    await queryInterface.addConstraint('Actuators', {
      fields: ['plot_id'],
      type: 'foreign key',
      name: 'fk_actuators_plot',
      references: {
        table: 'Plots',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la tabla 'Actuators'
    await queryInterface.dropTable('Actuators');
  },
};
