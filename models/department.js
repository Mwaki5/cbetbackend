"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      dept_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      institution_id: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      dept_code: {
        type: DataTypes.STRING,
      },
      deptName: {
        type: DataTypes.STRING,
      },
      hod: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
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
    { tableName: "departments", underscored: true, timestamps: true }
  );

  Department.associate = (models) => {
    Department.belongsTo(models.Institution, { foreignKey: "institution_id" });
    Department.belongsTo(models.User, { foreignKey: "hod", as: "hodUser" });
    Department.hasMany(models.Course, {
      foreignKey: "department_id",
      as: "courses",
    });
  };

  return Department;
};
