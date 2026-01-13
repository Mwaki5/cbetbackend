"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Institution = sequelize.define(
    "Institution",
    {
      institutionId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      institutionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      passwordHarsh: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
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
    { tableName: "institutions", underscored: false, timestamps: true }
  );

  Institution.associate = (models) => {
    Institution.hasMany(models.User, {
      foreignKey: "institutionId",
      as: "users",
    });
    Institution.hasMany(models.Department, {
      foreignKey: "institutionId",
      as: "departments",
    });
    Institution.hasMany(models.Course, {
      foreignKey: "institutionId",
      as: "courses",
    });
    Institution.hasMany(models.Session, {
      foreignKey: "institutionId",
      as: "sessions",
    });
    Institution.hasMany(models.Subscription, {
      foreignKey: "institutionId",
      as: "subscriptions",
    });
    Institution.hasMany(models.ActivityLog, {
      foreignKey: "institutionId",
      as: "activityLogs",
    });
  };

  return Institution;
};
