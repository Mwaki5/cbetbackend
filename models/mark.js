"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Mark = sequelize.define(
    "Mark",
    {
      markId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      enrollmentId: {
        type: DataTypes.UUID,
        references: {
          model: "enrollments",
          key: "enrollmentId",
        },
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Practical", "Theory"),
        allowNull: false,
      },
      marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gradedBy: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
        },
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
    { tableName: "marks", underscored: false, timestamps: true }
  );

  Mark.associate = (models) => {
    Mark.belongsTo(models.Enrollment, { foreignKey: "enrollmentId" });
    Mark.belongsTo(models.User, { foreignKey: "gradedBy", as: "grader" });
  };

  return Mark;
};
