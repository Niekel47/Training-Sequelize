import express from "express";
import sequelize from "./src/config/db.js";
import { config } from "dotenv";
import routes from "./src/routes/index.js";
import multer from "multer";
import {
  errorHandler,
  responseSuccess,
} from "./src/middleware/respone.middlware.js";
import path from "path";
import association from "./src/models/association.js";

config();
const app = express();
app.use(express.json());
app.use(responseSuccess);
app.use(express.urlencoded({ extended: true }));
const __dirname = path.resolve();
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/api", routes);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    // await db.sequelize.sync({alter: process.env.DB_ALTER !== 'false'});
    await sequelize.authenticate();
    console.log("✅ Database connected!");
    association.defineRelationships();
    console.log("✅ Database association!");
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
