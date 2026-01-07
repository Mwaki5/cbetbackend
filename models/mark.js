"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Mark = sequelize.define(
    "Mark",
    {
      mark_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      enrollment_id: {
        type: DataTypes.UUID,
        references: {
          model: "enrollments",
          key: "enrollment_id",
        },
      },
      type: {
        type: DataTypes.ENUM("Practical", "Theory"),
      },
      marks: {
        type: DataTypes.INTEGER,
      },
      graded_by: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
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
    { tableName: "marks", underscored: true, timestamps: true }
  );

  Mark.associate = (models) => {
    Mark.belongsTo(models.Enrollment, { foreignKey: "enrollment_id" });
    Mark.belongsTo(models.User, { foreignKey: "graded_by", as: "grader" });
  };

  return Mark;
};
