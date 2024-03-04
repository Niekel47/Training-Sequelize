import Author from "./author.model";
import Publisher from "./publisher.model";
import Product from "./product.model";
import Category from "./category.model";
import Book_Category from "./book_category.model";

Author.hasMany(Product, { foreignKey: "author_id" });
Publisher.hasMany(Product, { foreignKey: "publisher_id" });
Category.hasMany(Book_Category, { foreignKey: "category_id" });
Product.hasMany(Book_Category, { foreignKey: "product_id" });
