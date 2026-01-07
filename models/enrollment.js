"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Enrollment = sequelize.define(
    "Enrollment",
    {
      enrollment_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      student_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      unit_id: {
        type: DataTypes.UUID,
        references: {
          model: "units",
          key: "unit_id",
        },
      },
      session_id: {
        type: DataTypes.UUID,
        references: {
          model: "sessions",
          key: "session_id",
        },
      },
      enrolledAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { tableName: "enrollments", underscored: true, timestamps: true }
  );

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.User, {
      foreignKey: "student_id",
      as: "student",
    });
    Enrollment.belongsTo(models.Unit, { foreignKey: "unit_id" });
    Enrollment.belongsTo(models.Session, { foreignKey: "session_id" });
    Enrollment.hasMany(models.Mark, {
      foreignKey: "enrollment_id",
      as: "marks",
    });
    Enrollment.hasMany(models.Evidence, {
      foreignKey: "enrollment_id",
      as: "evidences",
    });
  };

  return Enrollment;
};
