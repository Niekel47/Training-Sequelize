import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define(
  "Category",
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
    tableName: "Category",
    timestamps: true,
  }
);
export default Category;
