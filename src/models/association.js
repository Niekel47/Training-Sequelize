import Author from "./author.model.js";
import Publisher from "./publisher.model.js";
import Product from "./product.model.js";
import Category from "./category.model.js";
import Product_Category from "./product_category.model.js";

class association {
  static defineRelationships() {
    Author.hasMany(Product, { foreignKey: "author_id" });
    Publisher.hasMany(Product, { foreignKey: "publisher_id" });
    Category.hasMany(Product_Category, { foreignKey: "category_id" });
    Product.hasMany(Product_Category, { foreignKey: "product_id" });
  }
}

export default association;
