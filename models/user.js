"use strict";
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      institution_id: {
        type: DataTypes.UUID,
        references: {
          key: "institution_id",
          model: "institutions",
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password_harsh: {
        type: DataTypes.TEXT,
      },
      role: {
        type: DataTypes.ENUM(
          "Super admin",
          "Institution admin",
          "HOD",
          "Trainer",
          "Student"
        ),
        defaultValue: "Student",
      },
      status: {
        type: DataTypes.BOOLEAN,
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
    { tableName: "users", underscored: true, timestamps: true }
  );
  User.associate = function (models) {
    User.belongsTo(models.Institution, {
      foreignKey: "institution_id",
    });
    User.hasMany(models.Enrollment, {
      foreignKey: "student_id",
      as: "enrollments",
    });
    User.hasMany(models.TrainerUnit, {
      foreignKey: "trainerId",
      as: "trainerUnits",
    });
    User.hasMany(models.Mark, { foreignKey: "graded_by", as: "gradedMarks" });
    User.hasMany(models.Evidence, {
      foreignKey: "reviewed_by",
      as: "reviewedEvidences",
    });
    User.hasMany(models.ActivityLog, {
      foreignKey: "user_id",
      as: "activityLogs",
    });
    User.hasOne(models.Department, {
      foreignKey: "hod",
      as: "headedDepartment",
    });
  };
  return User;
};
