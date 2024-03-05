import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Author = sequelize.define(
  "Author",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Author",
    timestamps: true,
  }
);
export default Author;
