import Sequelize from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: "5432",
  username: "postgres",
  password: "123456",
  database: "book_store",
});

export default sequelize;
