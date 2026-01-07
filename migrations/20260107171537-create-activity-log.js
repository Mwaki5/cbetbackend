"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activity_logs", {
      log_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      institution_id: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      action: {
        type: Sequelize.STRING,
      },
      entity: {
        type: Sequelize.STRING,
      },
      entity_id: {
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
