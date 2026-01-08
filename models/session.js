"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Session = sequelize.define(
    "Session",
    {
      sessionId: {
        allowNull: false,
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
      sessionName: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("Upcoming", "Active", "Done"),
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
    { tableName: "sessions", underscored: false, timestamps: true }
  );

  Session.associate = (models) => {
    Session.belongsTo(models.Institution, { foreignKey: "institutionId" });
    Session.hasMany(models.Enrollment, {
      foreignKey: "sessionId",
      as: "enrollments",
    });
    Session.hasMany(models.TrainerUnit, {
      foreignKey: "sessionId",
      as: "trainerUnits",
    });
  };

  return Session;
};
