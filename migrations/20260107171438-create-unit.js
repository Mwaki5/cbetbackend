"use strict";

const { UUID, UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("units", {
      unitId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      courseId: {
        type: Sequelize.UUID,
        references: {
          model: "courses",
          key: "courseId",
        },
        allowNull: false,
      },
      unitCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      unitName: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("units");
  },
};
