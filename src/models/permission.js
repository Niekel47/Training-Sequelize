import Sequelize, { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    key: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    timestamps: true,
  }
);

export default Permission;
