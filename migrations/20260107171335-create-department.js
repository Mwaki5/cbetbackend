"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("departments", {
      dept_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      institution_id: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      dept_code: {
        type: Sequelize.STRING,
      },
      dept_name: {
        type: Sequelize.STRING,
      },
      hod: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("departments");
  },
};
