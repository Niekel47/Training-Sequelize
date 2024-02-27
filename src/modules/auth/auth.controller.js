import { loginuser } from "./auth.service.js";

const loginUser = async (req, res) => {
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
    const newResponse = await loginuser(req.body);
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

export  {loginUser};
