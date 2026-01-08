"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Enrollment = sequelize.define(
    "Enrollment",
    {
      enrollmentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      studentId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
        },
      },
      unitId: {
        type: DataTypes.UUID,
        references: {
          model: "units",
          key: "unitId",
        },
      },
      sessionId: {
        type: DataTypes.UUID,
        references: {
          model: "sessions",
          key: "sessionId",
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { tableName: "enrollments", underscored: false, timestamps: true }
  );

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.User, {
      foreignKey: "studentId",
      as: "student",
    });
    Enrollment.belongsTo(models.Unit, { foreignKey: "unitId" });
    Enrollment.belongsTo(models.Session, { foreignKey: "sessionId" });
    Enrollment.hasMany(models.Mark, {
      foreignKey: "enrollmentId",
      as: "marks",
    });
    Enrollment.hasMany(models.Evidence, {
      foreignKey: "enrollmentId",
      as: "evidences",
    });
  };

  return Enrollment;
};
