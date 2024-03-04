import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book_Category = sequelize.define(
  "Book_Category",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "Book_Category",
    timestamps: true,
  }
);
export default Book_Category;
