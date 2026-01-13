"use strict";
const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      institutionId: {
        type: DataTypes.UUID,
        references: {
          key: "institutionId",
          model: "institutions",
        },
        allowNull: false,
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
      profilePic: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      passwordHarsh: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      deptId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "departments",
          key: "deptId",
        },
      },

      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refreshExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
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
    { tableName: "users", underscored: false, timestamps: true }
  );
  User.associate = function (models) {
    User.belongsTo(models.Institution, {
      foreignKey: "institutionId",
    });
    User.hasMany(models.Enrollment, {
      foreignKey: "studentId",
      as: "enrollments",
    });
    User.hasMany(models.TrainerUnit, {
      foreignKey: "trainerId",
      as: "trainerUnits",
    });
    User.hasMany(models.Mark, { foreignKey: "gradedBy", as: "gradedMarks" });
    User.hasMany(models.Evidence, {
      foreignKey: "reviewedBy",
      as: "reviewedEvidences",
    });
    User.hasMany(models.ActivityLog, {
      foreignKey: "userId",
      as: "activityLogs",
    });
    User.hasOne(models.Department, {
      foreignKey: "deptId",
      as: "headedDepartment",
    });
  };
  return User;
};
