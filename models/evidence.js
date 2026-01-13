"use strict";
const { allow } = require("joi");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Evidence = sequelize.define(
    "Evidence",
    {
      evidenceId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      enrollmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "enrollments",
          key: "enrollmentId",
        },
      },
      fileUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "approved",
      },
      reviewedBy: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
        },
        allowNull: true,
      },
      uploadedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
    { tableName: "evidences", underscored: false, timestamps: true }
  );

  Evidence.associate = (models) => {
    Evidence.belongsTo(models.Enrollment, { foreignKey: "enrollmentId" });
    Evidence.belongsTo(models.User, {
      foreignKey: "reviewedBy",
      as: "reviewer",
    });
  };

  return Evidence;
};
