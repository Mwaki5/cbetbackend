"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscriptions", {
      subscriptionId: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      institutionId: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
      },
      plan: {
        type: Sequelize.STRING,
      },
      maxStudents: {
        type: Sequelize.INTEGER,
      },
      storageLimitMb: {
        type: Sequelize.INTEGER,
      },
      expiresAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("subscriptions");
  },
};
