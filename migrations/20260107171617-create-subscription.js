"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscriptions", {
      subscription_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      institution_id: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      plan: {
        type: Sequelize.STRING,
      },
      max_students: {
        type: Sequelize.INTEGER,
      },
      storage_limitMb: {
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
