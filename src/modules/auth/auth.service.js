import { genneralAccessToken, genneralRefreshToken } from "./auth.jwt.js";
import bcrypt from "bcrypt";
import User from "../../models/user.js";

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
export { loginuser };
