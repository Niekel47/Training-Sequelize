import RoleService from "./role.service.js";
import { ListQueryReq } from "../../function/req.query.js";

class RoleController {
  // Phương thức tạo mới role
  static async create(req, res, next) {
    try {
      const { name, permissions, description } = req.body;
      const role = await RoleService.create({ name, permissions, description });
      res.status(200).json(role);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Phương thức danh sách role
  static async list(req, res, next) {
    try {
      const { name, description } = req.query;
      const filter = {
        ...(name && {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }),
      };
      const {
        limit,
        offset,
        filter: _filter,
        order,
      } = ListQueryReq(req, filter);
      const roles = await RoleService.list(limit, offset, _filter, order);
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  }

  // Phương thức danh sách quyền
  static async listPermission(req, res, next) {
    try {
      const permissions = await RoleService.listPermission();
      res.status(200).json(permissions);
    } catch (error) {
      next(error);
    }
  }

  // Phương thức cập nhật role
  static async update(req, res, next) {
    try {
      const id = req.params.id || "";
      const { name, permissions, description } = req.body;
      const role = await RoleService.update(
        { name, permissions, description },
        id
      );
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  // Phương thức xóa role
  static async delete(req, res, next) {
    try {
      const { ids = [] } = req.body;
      const roleDeleted = await RoleService.delete(ids);
      res.status(200).json(roleDeleted);
    } catch (error) {
      next(error);
    }
  }
}

export default RoleController;
