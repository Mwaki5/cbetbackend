"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
      courseId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      institutionId: {
        type: Sequelize.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "departments",
          key: "deptId",
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
