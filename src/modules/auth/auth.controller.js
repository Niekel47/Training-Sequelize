import AuthService from "./auth.service.js";

export default class AuthController {
  static async createUser(req, res) {
    try {
      const { fullname, email, password, phone } = req.body;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isCheckEmail = reg.test(email);
      if (!fullname || !email || !password || !phone) {
        return res.status(200).json({
          status: "ERR",
          message: "Yêu cầu điền hết thông tin!",
        });
      } else if (!isCheckEmail) {
        return res.status(500).json({
          status: "ERR",
          message: "Yêu cầu điền đúng định dạng email",
        });
      }
      const user = await AuthService.createuser(req.body);
      return res.status(200).json({
        data: { user },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async loginUser(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isCheckEmail = reg.test(email);
      if (!email || !password) {
        return res.status(200).json({
          status: "ERR",
          message: "Yêu cầu điền hết thông tin!",
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: "ERR",
          message: "Yêu cầu điền email",
        });
      }
      const login = await AuthService.loginuser(req.body);
      return {
        status: 200,
        message: "Thanh cong",
        data: { login },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


