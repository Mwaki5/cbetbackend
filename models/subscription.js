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
      },
      plan: {
        type: DataTypes.STRING,
      },
      maxStudents: {
        type: DataTypes.INTEGER,
      },
      storageLimitMb: {
        type: DataTypes.INTEGER,
      },
      expiresAt: {
        type: DataTypes.DATE,
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
