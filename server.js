import express from "express";
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const startServer = async () => {
  try {
    // await db.sequelize.sync({alter: process.env.DB_ALTER !== 'false'});
    await sequelize.authenticate();
    console.log("✅ Database connected!");
    await sequelize.sync({ alter: process.env.DB_ALTER !== "false" });
    console.log("✅ Database sync!");
    app.get("/user", (req, res) => {
      res.send("Hello World!");
    });
    const port = process.env.PORT || 3000;
    app.listen(port, async () => {
      console.log(`
🚀 Server ready at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

startServer();
