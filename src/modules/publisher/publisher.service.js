import Publisher from "../../models/publisher.model.js";

export default class PublisherService {
  static createPublisher = async (newPublisher) => {
    try {
      const { name } = newPublisher;
      const check_cat = await Publisher.findOne({ where: { name } });
      if (check_cat) {
        return {
          status: "Err",
          message: "Publisher đã tồn tại!",
        };
      }
      const post = await Publisher.create({
       
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

  static async getAllPublisher(req, res) {
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
      const totalCat = await Publisher.count(options.where);
      const totalPages = Math.ceil(totalCat / limit);
      // Thực hiện truy vấn để lấy danh sách người dùng với các tùy chọn đã được đặt
      const getallcat = await Publisher.findAll(options);
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

  static async updatePublisher(id, req, res) {
    try {
      const { name } = req.body;
      const existingCat = await Publisher.findByPk(id);
      if (!existingCat) {
        return res.status(404).json({
          error: "Publisher không tồn tại.",
        });
      }

      const updateCat = await Publisher.update(
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

  static async deletePublisher(id, req, res) {
    try {
      const existingCat = await Publisher.findByPk(id);
      if (!existingCat) {
        return res.status(404).json({
          error: "Publisher không tồn tại.",
        });
      }
      const destroy = await Publisher.destroy({ where: { id } });
      return destroy;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteManyPublishers(ids) {
    try {
      const destroy = await Publisher.destroy({ where: { id: ids } });
      return destroy;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
