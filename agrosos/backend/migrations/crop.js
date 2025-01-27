'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'Crops'
    await queryInterface.createTable('Crops', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      graphic_image: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      crop_image: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      start_month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    // Relación: 'Plots' tiene una clave foránea hacia 'Crops'
    await queryInterface.addConstraint('Plots', {
      fields: ['crop_id'],
      type: 'foreign key',
      name: 'fk_plots_crops',
      references: {
        table: 'Crops',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Relación: 'Rules' tiene una clave foránea hacia 'Crops'
    await queryInterface.addConstraint('Rules', {
      fields: ['crop_id'],
      type: 'foreign key',
      name: 'fk_rules_crops',
      references: {
        table: 'Crops',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar las claves foráneas relacionadas con 'Crops'
    await queryInterface.removeConstraint('Plots', 'fk_plots_crops');
    await queryInterface.removeConstraint('Rules', 'fk_rules_crops');

    // Eliminar la tabla 'Crops'
    await queryInterface.dropTable('Crops');
  },
};
