"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Evidence = sequelize.define(
    "Evidence",
    {
      evidence_id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      enrollment_id: {
        type: DataTypes.UUID,
      },
      file_url: {
        type: DataTypes.TEXT,
      },
      file_type: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "approved",
      },
      reviewed_by: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { tableName: "evidences", underscored: true, timestamps: true }
  );

  Evidence.associate = (models) => {
    Evidence.belongsTo(models.Enrollment, { foreignKey: "enrollment_id" });
    Evidence.belongsTo(models.User, {
      foreignKey: "reviewed_by",
      as: "reviewer",
    });
  };

  return Evidence;
};
