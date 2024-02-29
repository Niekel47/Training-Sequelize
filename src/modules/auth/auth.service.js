import bcrypt from "bcrypt";
import {
  genneralAccessToken,
  genneralRefreshToken,
} from "../../middleware/auth.middleware.js";
import User from "../../models/user.js";

export default class AuthService {
  static async createuser(newUser) {
    try {
      const { fullname, email, password, phone } = newUser;
      if (phone.length < 10 || phone.length > 11) {
        throw new Error("Số điện thoại phải có từ 10 đến 11 ký tự.");
      }
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
      const hashedPassword = await bcrypt.hashSync(password, 10);
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
  }

  static async loginuser(userLogin) {
    try {
      const { email, password } = userLogin;
      const checkUser = await User.findOne({ where: { email: email } });
      if (!checkUser) {
        return {
          status: "ERR",
          message: "User không tồn tại",
        };
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        return {
          status: "ERR",
          message: "Mật khẩu hoặc tài khoản không đúng",
        };
      } else {
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
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
