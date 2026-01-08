"use strict";

const { UUID } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("evidences", {
      evidenceId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      enrollmentId: {
        type: Sequelize.UUID,
      },
      fileUrl: {
        type: Sequelize.TEXT,
      },
      fileType: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        defaultValue: "approved",
      },
      reviewedBy: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "userId",
        },
      },
      uploadedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
    await queryInterface.dropTable("evidences");
  },
};
