import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import validator from 'validator';

const User = sequelize.define(
  "Users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Vui lòng nhập đúng định dạng email"
      },
      async customValidator(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email không hợp lệ');
        }
      }
    }
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "User",
    timestamps: false,
  }
);
export default User;
