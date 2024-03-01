import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "Users",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Mặc định là user
      validate: {
        isIn: [[0, 1]], // Giá trị phải là 0 hoặc 1
      },
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 11], // Số điện thoại phải có từ 10 đến 11 ký tự
      },
    },
  },
  {
    tableName: "User",
    timestamps: true,
  }
);
export default User;
