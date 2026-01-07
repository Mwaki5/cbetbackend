"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Subscription = sequelize.define(
    "Subscription",
    {
      subscription_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      institution_id: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      plan: {
        type: DataTypes.STRING,
      },
      max_students: {
        type: DataTypes.INTEGER,
      },
      storage_limitMb: {
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
    { tableName: "subscriptions", underscored: true, timestamps: true }
  );

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.Institution, {
      foreignKey: "institution_id",
    });
  };

  return Subscription;
};
