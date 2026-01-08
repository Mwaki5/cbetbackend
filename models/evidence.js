"use strict";
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
      },
      fileUrl: {
        type: DataTypes.TEXT,
      },
      fileType: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
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
