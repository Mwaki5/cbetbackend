"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("marks", {
      markId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      enrollmentId: {
        type: Sequelize.UUID,
        references: {
          model: "enrollments",
          key: "enrollmentId",
        },
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("Practical", "Theory"),
        allowNull: false,
      },
      marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gradedBy: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "userId",
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
    await queryInterface.dropTable("marks");
  },
};
