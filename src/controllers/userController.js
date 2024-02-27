import {
  createuser,
  getallUsers,
  updateuser,
  deleteuser,
  getuserById,
  loginuser,
} from "../services/userService.js";

const createUser = async (req, res) => {
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
      return res.status(200).json({
        status: "ERR",
        message: "Yêu cầu điền đúng định dạng email",
      });
    }
    const user = await createuser(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

const getAllUsers = async (req, res) => {
  try {
    const getalluser = await getallUsers(req, res);
    res.status(200).json(getalluser);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const put = await updateuser(id, req, res);
    res.status(200).json(put);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteuser(id, req, res);
    res.status(200).json({ message: "Người dùng đã được xóa thành công." });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getuserById(id);
    if (!user) {
      return res.status(500).json({ error: "Người dùng không tồn tại." });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
};
