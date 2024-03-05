import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Publisher = sequelize.define(
  "Publisher",
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
    tableName: "Publisher",
    timestamps: true,
  }
);
export default Publisher;
