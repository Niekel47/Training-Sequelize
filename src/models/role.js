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
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    permissions: DataTypes.TEXT,
    permissionsFormat: {
      type: DataTypes.VIRTUAL,
      get() {
        const permissions = this.getDataValue("permissions");
        return permissions ? permissions.split(",") : [];
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Permission;
