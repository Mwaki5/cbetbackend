"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Subscription = sequelize.define(
    "Subscription",
    {
      subscriptionId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      institutionId: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institutionId",
        },
        allowNull: false,
      },
      plan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxStudents: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storageLimitMb: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
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
    { tableName: "subscriptions", underscored: false, timestamps: true }
  );

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.Institution, {
      foreignKey: "institutionId",
    });
  };

  return Subscription;
};
