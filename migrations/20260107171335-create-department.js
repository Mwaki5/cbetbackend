"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("departments", {
      deptId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      institutionId: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
      },
      deptCode: {
        type: Sequelize.STRING,
      },
      deptName: {
        type: Sequelize.STRING,
      },
      hod: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "userId",
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
