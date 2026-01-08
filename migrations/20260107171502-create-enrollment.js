"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("enrollments", {
      enrollmentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      studentId: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "userId",
        },
      },
      unitId: {
        type: Sequelize.UUID,
        references: {
          model: "units",
          key: "unitId",
        },
      },
      sessionId: {
        type: Sequelize.UUID,
        references: {
          model: "sessions",
          key: "sessionId",
        },
      },
      enrolledAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("enrollments");
  },
};
