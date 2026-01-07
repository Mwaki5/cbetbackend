"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Institution = sequelize.define(
    "Institution",
    {
      institution_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      institution_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      address: {
        type: DataTypes.TEXT,
      },
      password_harsh: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      logo: {
        type: DataTypes.TEXT,
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
    { tableName: "institutions", underscored: true, timestamps: true }
  );

  Institution.associate = (models) => {
    Institution.hasMany(models.User, {
      foreignKey: "institution_id",
      as: "users",
    });
    Institution.hasMany(models.Department, {
      foreignKey: "institution_id",
      as: "departments",
    });
    Institution.hasMany(models.Course, {
      foreignKey: "institution_id",
      as: "courses",
    });
    Institution.hasMany(models.Session, {
      foreignKey: "institution_id",
      as: "sessions",
    });
    Institution.hasMany(models.Subscription, {
      foreignKey: "institution_id",
      as: "subscriptions",
    });
    Institution.hasMany(models.ActivityLog, {
      foreignKey: "institution_id",
      as: "activityLogs",
    });
  };

  return Institution;
};
