"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ActivityLog = sequelize.define(
    "ActivityLog",
    {
      logId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
        },
        allowNull: false,
      },
      institutionId: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entity: {
        type: DataTypes.STRING,
      },
      entityId: {
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
    { tableName: "activity_logs", underscored: false, timestamps: true }
  );

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.User, { foreignKey: "userId" });
    ActivityLog.belongsTo(models.Institution, { foreignKey: "institutionId" });
  };

  return ActivityLog;
};
