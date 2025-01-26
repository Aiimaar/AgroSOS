'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'Plots'
    await queryInterface.createTable('Plots', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^#([0-9A-F]{3}){1,2}$/i,
        },
      },
      crop_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Crops',
          key: 'id',
        },
      },
      default_image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      farmer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
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
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Relación: 'Plots' tiene una clave foránea hacia 'Users'
    await queryInterface.addConstraint('Plots', {
      fields: ['farmer_id'],
      type: 'foreign key',
      name: 'fk_plots_users',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar las claves foráneas relacionadas con 'Plots'
    await queryInterface.removeConstraint('Plots', 'fk_plots_crops');
    await queryInterface.removeConstraint('Plots', 'fk_plots_users');

    // Eliminar la tabla 'Plots'
    await queryInterface.dropTable('Plots');
  },
};
