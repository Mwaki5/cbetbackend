"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Unit = sequelize.define(
    "Unit",
    {
      unit_id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      course_id: {
        type: DataTypes.UUID,
        references: {
          model: "courses",
          key: "course_id",
        },
      },
      unit_code: {
        type: DataTypes.STRING,
      },
      unit_name: {
        type: DataTypes.STRING,
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
    { tableName: "units", underscored: true, timestamps: true }
  );

  Unit.associate = (models) => {
    Unit.belongsTo(models.Course, { foreignKey: "course_id" });
    Unit.hasMany(models.Enrollment, {
      foreignKey: "unit_id",
      as: "enrollments",
    });
    Unit.hasMany(models.TrainerUnit, {
      foreignKey: "unitId",
      as: "trainerUnits",
    });
  };

  return Unit;
};
