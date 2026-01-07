"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("marks", {
      mark_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      enrollment_id: {
        type: Sequelize.UUID,
        references: {
          model: "enrollments",
          key: "enrollment_id",
        },
      },
      type: {
        type: Sequelize.ENUM("Practical", "Theory"),
      },
      marks: {
        type: Sequelize.INTEGER,
      },
      graded_by: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id",
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
