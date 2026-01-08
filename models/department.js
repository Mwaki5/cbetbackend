"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      deptId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      institutionId: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
      },
      deptCode: {
        type: DataTypes.STRING,
      },
      deptName: {
        type: DataTypes.STRING,
      },
      hod: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
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
    { tableName: "departments", underscored: false, timestamps: true }
  );

  Department.associate = (models) => {
    Department.belongsTo(models.Institution, { foreignKey: "institutionId" });
    Department.belongsTo(models.User, { foreignKey: "hod", as: "hodUser" });
    Department.hasMany(models.Course, {
      foreignKey: "departmentId",
      as: "courses",
    });
  };

  return Department;
};
