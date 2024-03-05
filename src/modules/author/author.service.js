import Author from "../../models/author.model.js";

export default class AuthorService {
  static createAuthor = async (newauthor) => {
    try {
      const { name } = newauthor;
      const check_cat = await Author.findOne({ where: { name } });
      if (check_cat) {
        return {
          status: "Err",
          message: "Author đã tồn tại!",
        };
      }
      const post = await Author.create({
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

  static async getAllAuthor(req, res) {
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
      const totalAuthor = await Author.count(options.where);
      const totalPages = Math.ceil(totalAuthor / limit);
      // Thực hiện truy vấn để lấy danh sách người dùng với các tùy chọn đã được đặt
      const getallAuthor = await Author.findAll(options);
      return {
        totalAuthor,
        totalPages,
        getallAuthor,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateAuthor(id, req, res) {
    try {
      const { name } = req.body;
      const existingCat = await Author.findByPk(id);
      if (!existingCat) {
        return res.status(404).json({
          error: "Author không tồn tại.",
        });
      }

      const updateCat = await Author.update(
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

  static async deleteAuthor(id, req, res) {
    try {
      const existingCat = await Author.findByPk(id);
      if (!existingCat) {
        return res.status(404).json({
          error: "Author không tồn tại.",
        });
      }
      const destroy = await Author.destroy({ where: { id } });
      return destroy;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteManyAuthors(ids) {
    try {
      const destroy = await Author.destroy({ where: { id: ids } });
      return destroy;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
