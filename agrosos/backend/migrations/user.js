'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla 'Users'
    await queryInterface.createTable('Users', {
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
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // Relación: 'Users' tiene una relación uno a muchos con 'Rules'
    await queryInterface.addConstraint('Rules', {
      fields: ['technician_id'],
      type: 'foreign key',
      name: 'fk_rules_users_technician',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar la clave foránea relacionada con 'Rules' y 'Users'
    await queryInterface.removeConstraint('Rules', 'fk_rules_users_technician');

    // Eliminar la tabla 'Users'
    await queryInterface.dropTable('Users');
  },
};
