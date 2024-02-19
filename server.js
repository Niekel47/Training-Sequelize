import express from "express";
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";
import User from "./src/models/user.js";
// import route from "./src/routers/index.js";
dotenv.config();
const app = express();

// app.set("view engine", "ejs");
// app.set("views", "/src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(require("./routes/index.js"));

app.get("/api/user", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post("/api/user", async (req, res) => {
  const post=  await User.create(
      {
        username: "alice2222",
        email: "tewsst1sd234@gmail.com",
      }
    );
    res.json(post);
});

// app.put("/api/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const put = await User.update(
//     {
//       username: "alice12356789 ",
//       email: "tewsst1234@gmail.com",
//     },
//     { where: { id } }
//   );
//   res.json(put);
// });

// app.delete("/api/user/:id", async (req, res) => {
//   const { id } = req.params;
//   await User.destroy({ where: { id } });
//    res.json(req.params);
// });

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
