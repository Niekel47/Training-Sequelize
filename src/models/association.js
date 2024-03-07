import Author from "./author.model.js";
import Publisher from "./publisher.model.js";
import Product from "./product.model.js";
import Category from "./category.model.js";
import Product_Category from "./product_category.model.js";

class association {
  static defineRelationships() {
    Author.hasMany(Product, { foreignKey: "AuthorId" });
    Product.belongsTo(Author, {
      foreignKey: "AuthorId",
      targetKey: "id",
    });
    Product.belongsTo(Publisher, {
      foreignKey: "PublisherId",
      targetKey: "id",
    });
    Publisher.hasMany(Product, { foreignKey: "PublisherId" });
    Product.belongsToMany(Category, {
      through: Product_Category,
      
    });
    Category.belongsToMany(Product, {
      through: Product_Category,
      foreignKey: "CategoryId",
    });
    
  }
}

export default association;
