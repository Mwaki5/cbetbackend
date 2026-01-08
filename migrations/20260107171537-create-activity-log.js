"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activity_logs", {
      logId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "userId",
        },
      },
      institutionId: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
      },
      action: {
        type: Sequelize.STRING,
      },
      entity: {
        type: Sequelize.STRING,
      },
      entityId: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable("activity_logs");
  },
};
