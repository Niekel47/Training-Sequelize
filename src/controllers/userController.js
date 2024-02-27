import {
  createuser,
  getallUsers,
  updateuser,
  deleteuser,
  getuserById,
  loginuser
} from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;
    const user = await createuser(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    throw error;
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = { email, password };
    const result = await loginuser(userLogin);

    if (result.status === "OK") {
      res.status(200).json({
        message: "Login successful",
        access_token: result.access_token,
        refresh_token: result.refresh_token,
      });
    } else {
      res.status(401).json({
        error: "Authentication failed",
        message: result.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
      message: "Da xay ra loi khi yeu cau",
    });
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
