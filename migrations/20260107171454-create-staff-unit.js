"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("staff_units", {
      staffUnitId: {
        // This line remains unchanged
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      trainerId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "userId",
        },
        allowNull: false,
      },
      unitId: {
        type: Sequelize.UUID,
        references: {
          model: "units",
          key: "unitId",
        },
        allowNull: false,
      },
      sessionId: {
        type: Sequelize.UUID,
        references: {
          model: "sessions",
          key: "sessionId",
        },
        allowNull: false,
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
