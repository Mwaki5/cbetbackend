"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      deptId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      institutionId: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
        allowNull: false,
      },
      deptCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      deptName: {
        type: DataTypes.STRING,
        allowNull: false,
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
    Department.hasMany(models.Course, {
      foreignKey: "deptId",
      as: "courses",
    });
  };

  return Department;
};
