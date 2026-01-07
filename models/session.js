"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Session = sequelize.define(
    "Session",
    {
      session_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      institution_id: {
        type: DataTypes.UUID,
        references: {
          model: "institutions",
          key: "institution_id",
        },
      },
      session_name: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
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
    { tableName: "sessions", underscored: true, timestamps: true }
  );

  Session.associate = (models) => {
    Session.belongsTo(models.Institution, { foreignKey: "institution_id" });
    Session.hasMany(models.Enrollment, {
      foreignKey: "session_id",
      as: "enrollments",
    });
    Session.hasMany(models.TrainerUnit, {
      foreignKey: "sessionId",
      as: "trainerUnits",
    });
  };

  return Session;
};
