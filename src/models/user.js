import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import validator from 'validator';

const User = sequelize.define(
  "Users",
  {
    Hovaten: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Vui lòng nhập đúng định dạng email",
        },
        async customValidator(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email không hợp lệ");
          }
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(12), 
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 11], // Số điện thoại phải có từ 10 đến 11 ký tự
      },
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
