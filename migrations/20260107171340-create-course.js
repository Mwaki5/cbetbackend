"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
      course_id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      institution_id: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      department_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "departments",
          key: "dept_id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      courseCode: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("courses");
  },
};
