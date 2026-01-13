"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Unit = sequelize.define(
    "Unit",
    {
      unitId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      courseId: {
        type: DataTypes.UUID,
        references: {
          model: "courses",
          key: "courseId",
        },
        allowNull: false,
      },
      unitCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      unitName: {
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
    { tableName: "units", underscored: false, timestamps: true }
  );

  Unit.associate = (models) => {
    Unit.belongsTo(models.Course, { foreignKey: "courseId" });
    Unit.hasMany(models.Enrollment, {
      foreignKey: "unitId",
      as: "enrollments",
    });
    Unit.hasMany(models.TrainerUnit, {
      foreignKey: "unitId",
      as: "trainerUnits",
    });
  };

  return Unit;
};
