import bcrypt from "bcrypt";
import {
  genneralAccessToken,
  genneralRefreshToken,
} from "../../middleware/auth.middleware.js";
import User from "../../models/user.js";

export default class AuthService {
  static createuser = async (newUser) => {
    try {
      const { fullname, email, password, phone } = newUser;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return {
          status: "Err",
          message: "Email đã tồn tại!",
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const post = await User.create({
        fullname: fullname,
        email: email,
        password: hashedPassword,
        phone: phone,
      });
      return {
        status: 200,
        message: "Thanh cong",
        data: { post },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static loginuser = async (userLogin) => {
    try {
      const { email, password } = userLogin;
      const checkUser = await User.findOne({ where: { email: email } });
      if (!checkUser) {
        return {
          status: "ERR",
          message: "User không tồn tại",
        };
      }
      const comparePassword = bcrypt.compare(password, checkUser.password);
      if (!comparePassword) {
        return {
          status: "ERR",
          message: "Mật khẩu hoặc tài khoản không đúng",
        };
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      return {
        status: "OK",
        message: "Thành công",
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static async profile(id) {
    try {
      // Tìm người dùng trong cơ sở dữ liệu với id được cung cấp
      const user = await User.findByPk(id);
      if (!user) {
        return {
          status: 500,
          message: "Nguoi dung khong ton tai",
        };
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateprofile(id, newprofile) {
    try {
      // Tìm người dùng trong cơ sở dữ liệu với id được cung cấp
      const { fullname, email, phone } = newprofile;
      const user = await User.findByPk(id);
      if (!user) {
        return {
          status: 500,
          message: "Nguoi dung khong ton tai",
        };
      }
      return await user.update(newprofile);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async updatePassword(id, oldPassword, new_password) {
    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Người dùng không tồn tại");
      }
      const isValidOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isValidOldPassword) {
        throw new Error("Mật khẩu cũ không đúng");
      }
      if (oldPassword === new_password) {
        throw new Error("Vui lòng nhập mật khẩu mới khác mật khẩu cũ");
      }
      const hashedPassword = await bcrypt.hash(new_password, 10);
      await user.update({ password: hashedPassword });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
