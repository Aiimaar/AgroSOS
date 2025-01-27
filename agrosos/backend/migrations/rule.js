'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'Rules'
    await queryInterface.createTable('Rules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      crop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Crops',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      technician_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // La tabla de usuarios es 'Users', no 'technicians'
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      rule_info: {
        type: Sequelize.JSON,
        allowNull: false,
      },
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

    // Relación: 'Rules' tiene una clave foránea hacia 'Users' (para 'technician_id')
    await queryInterface.addConstraint('Rules', {
      fields: ['technician_id'],
      type: 'foreign key',
      name: 'fk_rules_technicians',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar las claves foráneas relacionadas con 'Rules'
    await queryInterface.removeConstraint('Rules', 'fk_rules_crops');
    await queryInterface.removeConstraint('Rules', 'fk_rules_technicians');

    // Eliminar la tabla 'Rules'
    await queryInterface.dropTable('Rules');
  },
};
