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
        allowNull: false,
      },
      deptId: {
        type: DataTypes.UUID,
        references: {
          model: "departments",
          key: "deptId",
        },
        allowNull: false,
      },
      courseName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseCode: {
        type: DataTypes.STRING,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { tableName: "courses", underscored: false, timestamps: true }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.Institution, { foreignKey: "institutionId" });
    Course.belongsTo(models.Department, { foreignKey: "deptId" });
    Course.hasMany(models.Unit, { foreignKey: "courseId", as: "units" });
  };

  return Course;
};
