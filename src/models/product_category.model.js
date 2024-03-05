import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product_Category = sequelize.define(
  "Product_Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "Product_Category",
    timestamps: true,
  }
);
export default Product_Category;
