import Role from "../../models/role.js";
import Permission from "../../models/permission.js";

export default class RoleService {
  static create = async (RoleInput) => {
    try {
      const { name, permissions, description } = RoleInput;
      // Check role name
      const roleExist = await Role.findOne({
        where: {
          name: name,
        },
      });

      if (roleExist) {
        throw new Error("The role name is exist");
      }

      // Create role
      return await Role.create({
        name: name,
        description: description,
        permissions: permissions.join(","), // Convert array to string
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  static update = async (RoleInput, id) => {
    try {
      const { name, permissions, description } = RoleInput;
      // Get role
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }

      // Check other role name
      const roleExist = await Role.findOne({
        where: {
          name: data.name,
          id: {
            not: id,
          },
        },
      });

      if (roleExist) {
        throw new Error("The role name is exist");
      }

      // Update role
      return await role.update({
        name: name,
        description: description,
        permissions: permissions.join(","), // Convert array to string
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  static delete = async (ids) => {
    try {
      const count = await Role.destroy({
        where: {
          id: {
            in: ids,
          },
        },
      });

      if (!count) {
        throw new Error("Can't delete the record. Please try again later!");
      }
      return count;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  static listRoles = async (req, res, next) => {
    try {
      const { limit = 50, offset = 0, filter, order = [] } = req.query;

      // Thực hiện tìm kiếm và đếm số lượng bản ghi
      const roles = await Role.findAndCountAll({
        where: filter,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        order: order.split(","), // Chuyển đổi chuỗi order thành một mảng
      });

      // Trả về kết quả cho client
      res.json(roles);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      next(error);
    }
  };

  static listPermission = async () => {
    try {
      return await Permission.findAndCountAll({});
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
