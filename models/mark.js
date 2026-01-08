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
      },
      type: {
        type: DataTypes.ENUM("Practical", "Theory"),
      },
      marks: {
        type: DataTypes.INTEGER,
      },
      gradedBy: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "userId",
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
    { tableName: "marks", underscored: false, timestamps: true }
  );

  Mark.associate = (models) => {
    Mark.belongsTo(models.Enrollment, { foreignKey: "enrollmentId" });
    Mark.belongsTo(models.User, { foreignKey: "gradedBy", as: "grader" });
  };

  return Mark;
};
