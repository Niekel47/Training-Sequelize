import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./product.model.js";
import Category from "./category.model.js";

const Product_Category = sequelize.define(
  "Product_Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    CategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    tableName: "Product_Category",
    timestamps: true,
  }
);
export default Product_Category;
