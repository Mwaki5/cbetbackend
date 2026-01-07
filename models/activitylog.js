"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ActivityLog = sequelize.define(
    "ActivityLog",
    {
      log_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      institution_id: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      action: {
        type: DataTypes.STRING,
      },
      entity: {
        type: DataTypes.STRING,
      },
      entity_id: {
        type: DataTypes.UUID,
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
    { tableName: "activity_logs", underscored: true, timestamps: true }
  );

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.User, { foreignKey: "user_id" });
    ActivityLog.belongsTo(models.Institution, { foreignKey: "institution_id" });
  };

  return ActivityLog;
};
