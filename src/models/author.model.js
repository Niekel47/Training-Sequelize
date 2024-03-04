import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Author = sequelize.define(
  "Author",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Author",
    timestamps: true,
  }
);
export default Author;
