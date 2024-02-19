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
  try {
    const { page, sort, search } = req.query;
    const limit = 5;
    const offset = 10;

    // Tùy chỉnh truy vấn dựa trên các tham số được truyền vào từ client
    const options = {
      order: [],
      where: {},
      limit,
      offset,
    };

    // Xử lý phần sắp xếp
    if (sort) {
      const [field, order] = sort.split(":");
      options.order.push([field, order]);
    }

    // Xử lý phần tìm kiếm
    if (search) {
      options.where = {
        [Op.or]: [
          { username: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };
    }
    // Thực hiện truy vấn để lấy danh sách người dùng với các tùy chọn đã được đặt
    const users = await User.findAll(options);
    res.json(users);
  } catch (error) {
    console.log(error)
    throw(error)
  }
});

app.post("/api/user", async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log("req.body:", req.body);
    const post = await User.create({
      username,
      email,
    });

    res.json(post);
  } catch (error) {
    console.error(error);
    throw error;
  }
  
});

app.put("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    console.log("ID:", id);
    console.log("req.body:", req.body);
    if (username != null) {
      const put = await User.update(
        {
          username,
          email,
        },
        { where: { id } }
      );

      res.json(put);
    } else {
      return res.json(404);
    }
  
  } catch (error) {
    console.error(error);
    throw error;
  }
  
});

app.delete("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.json(req.params);
  }catch (error) {
    console.log(error)
    throw(error)
  }
});

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
