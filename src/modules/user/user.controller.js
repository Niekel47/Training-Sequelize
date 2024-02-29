import UserService from "./user.service.js";
import { ListQueryReq } from "../../function/req.query.js";

export default class UserController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers(req, res);
      res.status(200).json(allUsers);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await UserService.updateUser(id, req, res);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id, req, res);
      res.status(200).json({ message: "Người dùng đã được xóa thành công." });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
