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
