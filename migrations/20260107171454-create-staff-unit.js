"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("staff_units", {
      staffUnitId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      trainer_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      unit_id: {
        type: Sequelize.UUID,
        references: {
          model: "units",
          key: "unit_id",
        },
      },
      session_id: {
        type: Sequelize.UUID,
        references: {
          model: "sessions",
          key: "session_id",
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
    await queryInterface.dropTable("staff_units");
  },
};
