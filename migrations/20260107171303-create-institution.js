"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("institutions", {
      institutionId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      institutionName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      address: {
        type: Sequelize.TEXT,
      },
      passwordHarsh: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      logo: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
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
    await queryInterface.dropTable("institutions");
  },
};
