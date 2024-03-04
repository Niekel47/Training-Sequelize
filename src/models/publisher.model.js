import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Publisher = sequelize.define(
  "Publisher",
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
    tableName: "Publisher",
    timestamps: true,
  }
);
export default Publisher;
