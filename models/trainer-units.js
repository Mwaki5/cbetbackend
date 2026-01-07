"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StaffUnit = sequelize.define(
    "TrainerUnit",
    {
      staffUnitId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      trainerId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      unitId: {
        type: DataTypes.UUID,
        references: {
          model: "units",
          key: "unit_id",
        },
      },
      sessionId: {
        type: DataTypes.UUID,
        references: {
          model: "sessions",
          key: "session_id",
        },
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
    { tableName: "staff_units", underscored: true, timestamps: true }
  );

  StaffUnit.associate = (models) => {
    StaffUnit.belongsTo(models.User, {
      foreignKey: "trainerId",
      as: "trainer",
    });
    StaffUnit.belongsTo(models.Unit, { foreignKey: "unitId" });
    StaffUnit.belongsTo(models.Session, { foreignKey: "sessionId" });
  };

  return StaffUnit;
};
