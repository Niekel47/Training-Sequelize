import User from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { genneralAccessToken, genneralRefreshToken } from "./JwtService.js";
const createuser = async (newUser) => {
  try {
    // Lấy thông tin từ yêu cầu của người dùng
    const { fullname, email, password, phone } = newUser;
    if (phone.length < 10 || phone.length > 11) {
      throw new Error("Số điện thoại phải có từ 10 đến 11 ký tự.");
    }
    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return {
        status: "Err",
        message: "Email đã tồn tại!",
      };
    }

    if (password.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
    }

    // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hashSync(password, 10);

    // Tạo người dùng mới với thông tin từ người dùng
    const post = await User.create({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      phone: phone,
    });
    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginuser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "User không tồn tại",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "Mật khẩu hoặc tài khoản không đúng",
        });
      } else {
        const access_token = await genneralAccessToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin,
        });

        const refresh_token = await genneralRefreshToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin,
        });
        resolve({
          status: "OK",
          message: "Thành công",
          access_token,
          refresh_token,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getallUsers = async (req, res) => {
  try {
    const { page, limit = 3, sort, search } = req.query;
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
          { fullname: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };
    }
    const totalUsers = await User.count(options.where);
    const totalPages = Math.ceil(totalUsers / limit);
    // Thực hiện truy vấn để lấy danh sách người dùng với các tùy chọn đã được đặt
    const users = await User.findAll(options);
    return {
      totalUsers,
      totalPages,
      users,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateuser = async (id, req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;
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

    if (phone.length < 10 || phone.length > 11) {
      return res.status(400).json({
        error: "Số điện thoại phải có từ 10 đến 11 ký tự.",
      });
    }

    if (password) {
      // Nếu có mật khẩu mới, hash lại mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(password, 10);
      const put = await User.update(
        {
          fullname,
          password: hashedPassword, // Sử dụng mật khẩu mới đã được hash
          phone,
        },
        { where: { id } }
      );

      return put;
    } else {
      // Nếu không có mật khẩu mới, chỉ cập nhật username và email
      const put = await User.update(
        {
          fullname,
          phone,
        },
        { where: { id } }
      );

      return put;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteuser = async (id, req, res) => {
  try {
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      return res.status(404).json({
        error: "Người dùng không tồn tại.",
      });
    }
    const destroy = await User.destroy({ where: { id } });
    return destroy;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getuserById = async (id, req, res) => {
  try {
    // Tìm người dùng trong cơ sở dữ liệu với id được cung cấp
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export {
  createuser,
  getallUsers,
  updateuser,
  deleteuser,
  getuserById,
  loginuser,
  
};
