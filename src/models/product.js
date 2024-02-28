import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    image: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    countInStock: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING },
    discount: { type: DataTypes.FLOAT },
    sold: { type: DataTypes.INTEGER },
  },
  {
    tableName: "Product",
    timestamps: true,
  }
);
export default Product;
