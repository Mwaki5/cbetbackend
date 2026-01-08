"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      courseId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      institutionId: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "departments",
          key: "deptId",
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      courseCode: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "courses", underscored: false, timestamps: true }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.Institution, { foreignKey: "institutionId" });
    Course.belongsTo(models.Department, { foreignKey: "departmentId" });
    Course.hasMany(models.Unit, { foreignKey: "courseId", as: "units" });
  };

  return Course;
};
