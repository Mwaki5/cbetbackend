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
      },
      type: {
        type: Sequelize.ENUM("Practical", "Theory"),
      },
      marks: {
        type: Sequelize.INTEGER,
      },
      gradedBy: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "userId",
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
    await queryInterface.dropTable("marks");
  },
};
