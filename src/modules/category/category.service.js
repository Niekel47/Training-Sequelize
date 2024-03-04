import Category from "../../models/category.model.js";

export default class CategoryService {
  static createCategory = async (newcategory) => {
    try {
      const { name } = newcategory;
      const check_cat = await Category.findOne({ where: { name } });
      if (check_cat) {
        return {
          status: "Err",
          message: "Category đã tồn tại!",
        };
      }
      const post = await Category.create({
        name: name,
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

  static async getAllCategory(req, res) {
    try {
      const { page, limit = 3, sort, search } = req.query;
      // Tùy chỉnh truy vấn dựa trên các tham số được truyền vào từ client
      const options = {
        order: [],
        where: {},
      };
      // Xử lý phần trang
      if (page && limit) {
        const offset = (page - 1) * limit;
        options.offset = offset;
        options.limit = limit;
      }

      // Xử lý phần sắp xếp
      if (sort) {
        const [field, order] = sort.split(":");
        options.order.push([field, order]);
      }

      // Xử lý phần tìm kiếm
      if (search) {
        options.where = {
          [Op.or]: [
            { fullname: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        };
      }
      const totalCat = await Category.count(options.where);
      const totalPages = Math.ceil(totalCat / limit);
      // Thực hiện truy vấn để lấy danh sách người dùng với các tùy chọn đã được đặt
      const getallcat = await Category.findAll(options);
      return {
        totalCat,
        totalPages,
        getallcat,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateCategory(id, req, res) {
    try {
      const { name } = req.body;
      const existingCat = await Category.findByPk(id);
      if (!existingCat) {
        return res.status(404).json({
          error: "Category không tồn tại.",
        });
      }

      const updateCat = await Category.update(
        {
          name,
        },
        { where: { id } }
      );

      return updateCat;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteCategory(id, req, res) {
    try {
      const existingCat = await Category.findByPk(id);
      if (!existingCat) {
        return res.status(404).json({
          error: "Category không tồn tại.",
        });
      }
      const destroy = await Category.destroy({ where: { id } });
      return destroy;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteManyCategorys(ids) {
    try {
      const destroy = await Category.destroy({ where: { id: ids } });
      return destroy;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
