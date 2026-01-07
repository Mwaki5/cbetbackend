"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Course = sequelize.define(
    "Course",
    {
      course_id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      institution_id: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      department_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "departments",
          key: "dept_id",
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      courseCode: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "courses", underscored: true, timestamps: true }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.Institution, { foreignKey: "institution_id" });
    Course.belongsTo(models.Department, { foreignKey: "department_id" });
    Course.hasMany(models.Unit, { foreignKey: "course_id", as: "units" });
  };

  return Course;
};
