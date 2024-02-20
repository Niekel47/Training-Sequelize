import express from "express";
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";
import route from "./src/routers/index.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const startServer = async () => {
  try {
    // await db.sequelize.sync({alter: process.env.DB_ALTER !== 'false'});
    await sequelize.authenticate();
    console.log("✅ Database connected!");
    await sequelize.sync({ alter: process.env.DB_ALTER !== "false" });
    console.log("✅ Database sync!");
    const port = process.env.PORT || 3001;
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
