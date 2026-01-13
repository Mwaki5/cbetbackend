"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      institutionId: {
        type: Sequelize.UUID,
        references: {
          key: "institutionId",
          model: "institutions",
        },
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profilePic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      deptId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "departments",
          key: "deptId",
        },
      },
      passwordHarsh: {
        type: Sequelize.TEXT,
      },
      role: {
        type: Sequelize.ENUM(
          "Super admin",
          "Institution admin",
          "HOD",
          "Trainer",
          "Student"
        ),
        defaultValue: "Student",
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("users");
  },
};
