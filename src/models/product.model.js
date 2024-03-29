import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.model.js";

const Product = sequelize.define(
  "Product",

  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    AuthorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    PublisherId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
    image: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "Product",
    timestamps: true,
  }
);

export default Product;
