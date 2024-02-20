import express from "express";
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";
import User from "./src/models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/user", async (req, res) => {
  try {
    const { page, limit=3, sort, search } = req.query;

    // Tùy chỉnh truy vấn dựa trên các tham số được truyền vào từ client
    const options = {
      order: [],
      where: {},
    };

    // Xử lý phần trang
    if (page && limit) {
      const offset = (page - 1) * limit;
      options.offset = offset;
      options.limit = limit;
    }

    // Xử lý phần sắp xếp
    if (sort) {
      const [field, order] = sort.split(":");
      options.order.push([field, order]);
    }

    // Xử lý phần tìm kiếm
    if (search) {
      options.where = {
        [Op.or]: [
          { Hovaten: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };
    }
      const totalUsers = await User.count(options.where);
      const totalPages = Math.ceil(totalUsers / limit);
      console.log(totalPages)
    // Thực hiện truy vấn để lấy danh sách người dùng với các tùy chọn đã được đặt
    const users = await User.findAll(options);
    res.json({
      status: 200, // 500, 400, 404, 403
      data: {
        total: totalUsers,
        totalPages: totalPages,
        items: users,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.post("/api/user", async (req, res) => {
   try {
     // Lấy thông tin từ yêu cầu của người dùng
     const { Hovaten, email, password, phone} = req.body;
     // Kiểm tra xem người dùng đã cung cấp tên người dùng, email và mật khẩu chưa
     if (!Hovaten || !email || !password || !phone) {
       return res.status(400).json({
         error:
           "Vui lòng cung cấp đầy đủ thông tin tên người dùng, email và mật khẩu.",
       });
     }
     if (!validator.isEmail(email)) {
       return res.status(400).json({
         error: "Vui lòng cung cấp địa chỉ email hợp lệ.",
       });
     }

     // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
     const existingUser = await User.findOne({ where: { email } });
     if (existingUser) {
       return res.status(400).json({
         error: "Email đã tồn tại. Vui lòng chọn email khác.",
       });
     }

     if (password.length < 6) {
       return res.status(400).json({
         error: "Mật khẩu phải có ít nhất 6 ký tự.",
       });
     }

     // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
     const hashedPassword = await bcrypt.hash(password, 10);

     // Tạo người dùng mới với thông tin từ người dùng
     const post = await User.create({
       Hovaten: Hovaten,
       email: email,
       password: hashedPassword,
       phone:phone
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
    const { username, email, password } = req.body;
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return res.status(404).json({
        error: "Người dùng không tồn tại.",
      });
    }

    // Kiểm tra xem người dùng có cố gắng cập nhật email không
    if (email && email !== existingUser.email) {
      return res.status(400).json({
        error: "Không được phép cập nhật email.",
      });
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        error: "Mật khẩu phải có ít nhất 6 ký tự.",
      });
    }

    if (phone.length <= 10 || phone.length > 11) {
      return res.status(400).json({
        error: "Số điện thoại phải có từ 10 đến 11 ký tự.",
    });
    }

    if (password) {
      // Nếu có mật khẩu mới, hash lại mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(password, 10);
      const put = await User.update(
        {
          Hovaten,
          password: hashedPassword, // Sử dụng mật khẩu mới đã được hash
          phone,
        },
        { where: { id } }
      );

      res.json(put);
    } else {
      // Nếu không có mật khẩu mới, chỉ cập nhật username và email
      const put = await User.update(
        {
          Hovaten,
          phone,
        },
        { where: { id } }
      );

      res.json(put);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  
});

app.delete("/api/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return res.status(404).json({
        error: "Người dùng không tồn tại.",
      });
    }
    await User.destroy({ where: {id} });
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
